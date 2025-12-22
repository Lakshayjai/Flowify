import YTMusic from "ytmusic-api";

let ytmusic = null;

// Initialize YouTube Music (anonymous)
export async function initYTMusic() {
  if (!ytmusic) {
    ytmusic = new YTMusic();
    await ytmusic.initialize();
  }
}

// Search a song on YouTube Music
export async function searchSongOnYT(songTitle, artistName) {
  await initYTMusic();

  const query = `${songTitle} ${artistName}`.trim();
  const results = await ytmusic.search(query, "songs");

  if (!results || results.length === 0) {
    return null;
  }

  const bestMatch = results[0];

  return {
    title: bestMatch.title,
    artist: bestMatch.artists?.map(a => a.name).join(", "),
    videoId: bestMatch.videoId,
  };
}
