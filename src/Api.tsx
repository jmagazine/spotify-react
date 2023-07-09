/* eslint-disable react-refresh/only-export-components */
"use strict";
interface Track {
  id: string;
  title: string;
  artists: string[];
  duration: number;
  link: string;
  image: Image;
  preview: string;
}

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
  const trackList: Track[] = [];
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
        const t: Track = {
          id: track.id,
          title: track.name,
          artists: [],
          duration: track.duration_ms,
          link: track.external_urls.spotify,
          image: track.album.images[1],
          preview: track.preview_url,
        };
        for (let j = 0; j < track.artists.length; j++) {
          t.artists.push(track.artists[j].name);
        }
        trackList.push(t);
      }
      return trackList;
    } catch (err) {
      console.log(`Error: ${err}`);
    }
}

export default search;
export type { Track };
