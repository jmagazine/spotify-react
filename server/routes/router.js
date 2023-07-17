"use strict";
require("dotenv").config({
  path: "/etc/secrets/.env",
});
const express = require("express");
const router = express.Router();
const request = require("request");
let access_token;
let host;
if (process.env.NODE_ENV === "production") {
  host = "https://example.com/";
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
    const token = data.access_token;
    return token;
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
    );
    const data = await response.json();
    const tracks = data.tracks.items;
    for (let i = 0; i < Object.keys(tracks).length; i++) {
      const track = tracks[i];
      const t = {
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
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(
        "https://api.spotify.com/v1/tracks/3asFGFY3uLjMDmML1p0tYm",
        options
      ).then((res) => {
        // console.log(response);
      });
    }
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
    user-read-private";

  let state = generateRandomString(16);

  let auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.clientId,
    scope: scope,
    redirect_uri: host + "auth/callback",
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

router.get("/search/:query", async (req, res) => {
  const token = await getAccessToken();
  const trackList = await search(req.params.query, token);
  res.send(trackList);
});

router.get("/auth/token", (req, res) => {
  res.json({
    access_token: access_token,
  });
});

module.exports = router;
module.exports = host;
