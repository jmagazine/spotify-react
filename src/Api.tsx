/* eslint-disable react-refresh/only-export-components */
"use strict";

interface Image {
  height: number;
  url: string;
  width: number;
}

const clientId = "07d3869485434b539dc5af6ca92c04de";
const clientSecret = "1eca1391d81440d3ac4309d2b869dd20";
let ACCESSTOKEN: string;
const authOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `grant_type=client_credentials&client_id=${encodeURIComponent(
    clientId
  )}&client_secret=${encodeURIComponent(clientSecret)}`,
  json: true,
};

async function getAccessToken() {
  if (!ACCESSTOKEN)
    try {
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        authOptions
      );
      const data = await response.json();
      const token = data.access_token;
      return token;
    } catch (err) {
      console.log("Error: " + err);
    }
}

async function search(text: string, token: string) {
  const q = text.split(" ").join("+");
  const trackList: Spotify.Track[] = [];
  if (text)
    try {
      const searchQuery = {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${q}&type=track`,
        searchQuery
      );
      const data = await response.json();
      const tracks = data.tracks.items;
      for (let i = 0; i < Object.keys(tracks).length; i++) {
        const track = tracks[i];
        trackList.push(track);
      }
      return trackList;
    } catch (err) {
      console.log(`Error: ${err}`);
    }
}

export default search;
