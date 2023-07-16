import { useState, useEffect } from "react";

interface Props {
  token: string;
}

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function AudioPlayer({ token }: Props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [current_track, setTrack] = useState(track);
  const [ready, setReady] = useState(false); // Flag to track if the event listener is registered

  useEffect(() => {
    if (!ready) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        if (!ready) {
          const player = new window.Spotify.Player({
            name: "React app",
            getOAuthToken: (cb) => {
              cb(token);
            },
            volume: 0.5,
          });

          setPlayer(player);
          setReady(true); // Set the flag to true to prevent multiple event listener registrations

          player.connect().then((success) => {
            if (success) {
              console.log(
                "The Web Playback SDK successfully connected to Spotify!"
              );
            }
          });

          player.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
          });

          player.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
          });

          player.addListener("player_state_changed", (state) => {
            if (!state) {
              return;
            }
            console.log("state", state);
            setTrack(state.track_window.current_track);
            setPaused(state.paused);

            player.getCurrentState().then((state) => {
              !state ? setActive(false) : setActive(true);
            });
          });
        }
      };
    }
  }, [ready]);

  if (!is_active) {
    console.log(ready);
    return (
      <div className="d-flex bottom-0">
        <div className="main-wrapper">
          <b>
            Instance not active. Transfer your playback using your Spotify app{" "}
          </b>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b> Instance active.</b>
            <img></img>
          </div>
        </div>
      </>
    );
  }
}

export default AudioPlayer;
