import express from "express";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
import youtubeAuthRoutes from "./routes/youtubeAuthRoutes.js";

// 🔴 UPDATED IMPORT
import { 
  getUserPlaylists,
  getLikedSongs
} from "./services/spotifyService.js";

const app = express();
const PORT = 3000;

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

// Session
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false
    }
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/auth", youtubeAuthRoutes);
app.use("/", transferRoutes);

// Home
app.get("/", (req, res) => {
  if (req.session.spotifyAccessToken) {
    return res.redirect("/dashboard");
  }
  res.render("index");
});

// 🔴 UPDATED DASHBOARD ROUTE
app.get("/dashboard", async (req, res) => {
  if (!req.session.spotifyAccessToken) {
    return res.redirect("/");
  }

  try {
    const accessToken = req.session.spotifyAccessToken;

    const playlists = await getUserPlaylists(accessToken);
    const likedSongs = await getLikedSongs(accessToken);

    // Inject Liked Songs as a fake playlist
    playlists.unshift({
      id: "liked_songs",
      name: "❤️ Liked Songs",
      tracks: {
        total: likedSongs.length
      },
      isLikedSongs: true
    });

    res.render("dashboard", { playlists });

  } catch (err) {
    console.error("Dashboard error:", err.message);
    res.send("Failed to load dashboard");
  }
});

console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET =", process.env.GOOGLE_CLIENT_SECRET);
console.log("GOOGLE_REDIRECT_URI =", process.env.GOOGLE_REDIRECT_URI);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
