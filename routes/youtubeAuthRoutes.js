import express from "express";
import {
  getYouTubeAuthURL,
  setYouTubeTokens
} from "../services/youtubeOAuthService.js";

const router = express.Router();

// Step 1: Redirect to Google login
router.get("/youtube", (req, res) => {
  const url = getYouTubeAuthURL();
  res.redirect(url);
});

// Step 2: OAuth callback
router.get("/youtube/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokens = await setYouTubeTokens(code);
    req.session.youtubeTokens = tokens;
    res.redirect("/dashboard");
  } catch (err) {
    console.error("YouTube OAuth error:", err.message);
    res.send("YouTube authentication failed");
  }
});

export default router;
