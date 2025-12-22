🎵 Playlist Bridge

Transfer Spotify playlists & liked songs to YouTube Music

Playlist Bridge is a full-stack web application that allows users to transfer their Spotify playlists — including Liked Songs — to YouTube Music using official APIs.

🚀 Features

🔐 Spotify OAuth authentication
📂 Fetch all Spotify playlists
❤️ Fetch Spotify Liked Songs (with full pagination)
🔍 Match Spotify tracks to YouTube videos
▶️ Create YouTube Music playlists automatically
➕ Add matched songs to YouTube Music playlists
📊 Transfer summary with skipped songs
🧠 Safe handling of unmatched tracks

🛠️ Tech Stack

Backend: Node.js, Express.js (ES Modules)
Frontend: EJS, CSS
APIs:
Spotify Web API
YouTube Data API v3
Auth: OAuth 2.0 (Spotify & Google)
Session Management: express-session


📁 Project Structure
playlist-bridge/
│
├── server.js
├── package.json
├── .env
│
├── routes/
│   ├── authRoutes.js
│   ├── youtubeAuthRoutes.js
│   └── transferRoutes.js
│
├── services/
│   ├── spotifyService.js
│   ├── youtubeService.js
│   └── youtubePlaylistService.js
│
├── views/
│   ├── index.ejs
│   └── dashboard.ejs
│
└── public/



🔐 Environment Variables

Create a .env file in the root directory:

PORT=3000
SESSION_SECRET=your_session_secret
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/auth/spotify/callback

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/youtube/callback



▶️ How It Works

1. User logs in with Spotify
2. App fetches:
  Spotify playlists
  Spotify liked songs (❤️)
3. User selects a playlist or liked songs
4. Songs are matched with YouTube videos
5. User logs in with Google
6. App creates a YouTube Music playlist
7. Matched songs are added automatically
8.Transfer summary is shown



🧪 Local Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/playlist-bridge.git
cd playlist-bridge

2️⃣ Install dependencies
npm install

3️⃣ Run the server
nodemon server.js

4️⃣ Open in browser
http://localhost:3000


⚠️ Notes
Spotify Liked Songs are not playlists, so special handling is implemented.
Spotify API responses are paginated — this project fetches all pages safely.
YouTube search may skip songs if no reliable match is found.

🧠 What I Learned
OAuth 2.0 flows (Spotify & Google)
Working with third-party APIs
Pagination handling
Session-based authentication
Real-world API limitations & error handling
Writing scalable backend logic

📌 Future Improvements
⏳ Transfer progress bar
🔄 Resume interrupted transfers
⚡ Batch YouTube searches for speed
🎨 Improved UI/UX
📱 Mobile responsiveness


👤 Author
Lakshay Jain
B.Tech (3rd Year) | Full Stack Developer
Learning MERN & API-based systems
