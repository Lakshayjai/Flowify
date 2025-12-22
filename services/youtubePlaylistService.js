import { getYouTubeClient } from "./youtubeOAuthService.js";

// Create YouTube playlist
export async function createYTPlaylist(title, description) {
  const youtube = getYouTubeClient();

  const response = await youtube.playlists.insert({
    part: "snippet,status",
    requestBody: {
      snippet: {
        title,
        description
      },
      status: {
        privacyStatus: "private"
      }
    }
  });

  return response.data.id;
}

// Add videos to playlist
export async function addVideosToPlaylist(playlistId, videoIds) {
  const youtube = getYouTubeClient();

  for (const videoId of videoIds) {
    await youtube.playlistItems.insert({
      part: "snippet",
      requestBody: {
        snippet: {
          playlistId,
          resourceId: {
            kind: "youtube#video",
            videoId
          }
        }
      }
    });
  }
}
