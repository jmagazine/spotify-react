"use strict";
import { configDotenv } from "dotenv";

// configDotenv({ path: "/etc/secrets/.env" });
configDotenv({
  path: "C:/Users/joshm/Documents/code/spotify-api/spotify-react/.env",
});
import { Router } from "express";
const router = Router();
import request from "request";
import fetch from "node-fetch/src/index.js";

let host;
if (process.env.NODE_ENV === "production") {
  host = "https://spotify-search-p8vf.onrender.com";
} else {
  host = "http://localhost:4000/";
}

async function getAccessToken() {
  try {
    const authOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${encodeURIComponent(
        process.env.clientId
      )}&client_secret=${encodeURIComponent(process.env.clientSecret)}`,
      json: true,
    };
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    const data = await response.json();
    return data.access_token;
  } catch (err) {
    console.log("Error: " + err);
  }
}


async function search(text, token) {
  const trackList = [];
  try {
    const searchQuery = {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    };
    // search for tracks
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${text}&type=track`,
      searchQuery
    ).then((data) => {
      return data;
    });

    const data = await response.json();
    const tracks = data.tracks.items;
    for (let i = 0; i < tracks.length; i++) {
      const trackData = tracks[i];
      const track = {
        id: trackData.id,
        title: trackData.name,
        artists: trackData.artists.map((artist) => artist.name),
        duration: trackData.duration_ms,
        link: trackData.external_urls.spotify,
        image: trackData.album.images[1],
        preview: trackData.preview_url,
      };
      trackList.push(track);
    }
    console.log(trackList);
    return trackList;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

const generateRandomString = function (length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get("/auth/login", (req, res) => {
  let scope =
    "streaming \
    user-read-email \
    user-read-private \
    user-modify-playback-state";

  let state = generateRandomString(16);

  let auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.clientId,
    scope: scope,
    redirect_uri: host + "/auth/callback",
    redirect_uri: host + "/auth/callback",
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

router.get("/auth/callback", (req, res) => {
  let code = req.query.code;

  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: host + "/auth/callback",
      redirect_uri: host + "/auth/callback",
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.clientId + ":" + process.env.clientSecret
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect("https://master--deft-sprinkles-667efb.netlify.app/");
    }
  });
});

router.get("/auth/token", (req, res) => {
  getAccessToken().then((token) => {
    if (res) {
      res.json({
        access_token: token,
      });
    } else {
      res.redirect(host + "/auth/login");
    }
  });
});

export default router;
export default router;
