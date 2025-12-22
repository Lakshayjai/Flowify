import dotenv from "dotenv";
dotenv.config();

import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = [
  "https://www.googleapis.com/auth/youtube"
];

// Generate Google auth URL
export function getYouTubeAuthURL() {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent"
  });

  console.log("AUTH URL:", url); // TEMP DEBUG
  return url;
}

// Exchange code for tokens
export async function setYouTubeTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

// Get authenticated YouTube client
export function getYouTubeClient() {
  return google.youtube({
    version: "v3",
    auth: oauth2Client
  });
}
