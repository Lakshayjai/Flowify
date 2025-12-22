import express from "express";
import axios from "axios";

const router = express.Router(); // Create a router instance

// Step 1: Redirect user to Spotify login
router.get("/spotify", (req, res) => {
  const scope =
  "playlist-read-private playlist-read-collaborative user-library-read";


  const authUrl =
    "https://accounts.spotify.com/authorize" +
    "?response_type=code" +
    "&client_id=" +
    process.env.SPOTIFY_CLIENT_ID +
    "&scope=" +
    encodeURIComponent(scope) +
    "&redirect_uri=" +
    encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI);

  res.redirect(authUrl);
});

// Step 2: Spotify callback
router.get("/spotify/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Save token in session
    req.session.spotifyAccessToken = tokenResponse.data.access_token;

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Spotify Auth Error:", error.response.data);
    res.send("Authentication failed");
  }
});

export default router;
