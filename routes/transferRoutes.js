import express from "express";

// 🔴 UPDATED IMPORTS
import { 
  getPlaylistTracks,
  getLikedSongs
} from "../services/spotifyService.js";

import { searchSongOnYT } from "../services/youtubeService.js";
import {
  createYTPlaylist,
  addVideosToPlaylist
} from "../services/youtubePlaylistService.js";

const router = express.Router();

/* ===========================
   🔍 TEST MATCH (Phase 5)
   =========================== */
router.get("/match/:playlistId", async (req, res) => {
  if (!req.session.spotifyAccessToken) {
    return res.redirect("/");
  }

  try {
    const playlistId = req.params.playlistId;

    // 🔴 BRANCH LOGIC FOR LIKED SONGS
    let tracks = [];

    if (playlistId === "liked_songs") {
      tracks = await getLikedSongs(req.session.spotifyAccessToken);
    } else {
      tracks = await getPlaylistTracks(
        req.session.spotifyAccessToken,
        playlistId
      );
    }

    const matched = [];
    const skipped = [];

    for (const item of tracks) {
      if (!item.track) continue;

      const title = item.track.name;
      const artist = item.track.artists.map(a => a.name).join(" ");

      const yt = await searchSongOnYT(title, artist);

      if (yt) {
        matched.push({
          spotify: { title, artist },
          youtube: yt
        });
      } else {
        skipped.push({ title, artist });
      }
    }

    res.json({ matched, skipped });

  } catch (err) {
    console.error("Match error:", err.message);
    res.status(500).send("Song matching failed");
  }
});

/* ===========================
   🚀 FULL TRANSFER (Phase 6)
   =========================== */
router.post("/transfer/:playlistId", async (req, res) => {
  if (!req.session.spotifyAccessToken || !req.session.youtubeTokens) {
    return res.redirect("/");
  }

  try {
    const playlistId = req.params.playlistId;

    // 🔴 BRANCH LOGIC FOR LIKED SONGS
    let tracks = [];

    if (playlistId === "liked_songs") {
      tracks = await getLikedSongs(req.session.spotifyAccessToken);
    } else {
      tracks = await getPlaylistTracks(
        req.session.spotifyAccessToken,
        playlistId
      );
    }

    const matched = [];
    const skipped = [];

    for (const item of tracks) {
      if (!item.track) continue;

      const title = item.track.name;
      const artist = item.track.artists.map(a => a.name).join(" ");

      const yt = await searchSongOnYT(title, artist);

      if (yt) matched.push(yt.videoId);
      else skipped.push({ title, artist });
    }

    const ytPlaylistId = await createYTPlaylist(
      "Spotify Import",
      "Transferred from Spotify"
    );

    await addVideosToPlaylist(ytPlaylistId, matched);

    res.json({
      status: "success",
      added: matched.length,
      skipped: skipped.length,
      skippedSongs: skipped
    });

  } catch (err) {
    console.error("Transfer error:", err.message);
    res.status(500).send("Playlist transfer failed");
  }
});

export default router;
