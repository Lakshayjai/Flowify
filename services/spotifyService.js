import axios from "axios";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

// Fetch user's playlists
export async function getUserPlaylists(accessToken) {
  const response = await axios.get(`${SPOTIFY_BASE_URL}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.items;
}

// Fetch tracks of a specific playlist
export async function getPlaylistTracks(accessToken, playlistId) {
  const response = await axios.get(
    `${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.items;
}

// Fetch user's Liked Songs
export async function getLikedSongs(accessToken) {
  let allTracks = [];
  let offset = 0;
  const limit = 50;

  while (true) {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/tracks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          limit,
          offset
        }
      }
    );

    const items = response.data.items;
    allTracks = allTracks.concat(items);

    if (items.length < limit) break; // no more songs
    offset += limit;
  }

  return allTracks;
}

