import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";

interface Props {
  token: String;
  track: Spotify.Track | undefined;
}

function AudioPlayer({ token, track }: Props) {
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [isPaused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [position, setPostion] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: Function) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }: any) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
    };
  }, []);

  if (player) {
    player.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }

      setTrack(state.track_window.current_track);
      setPaused(state.paused);

      player.getCurrentState().then((state) => {
        console.log(state);
        if (state) {
          setActive(true);
          setPostion(state.position);
          setDuration(state.duration);
        } else {
          setActive(false);
        }
      });
    });
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Now Playing</h1>
      <div className="position-relative">
        <img
          src={track ? track.image.url : ""}
          className="card-img-top mb-3 z-0"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
          alt="..."
        />
        <img
          className="position-absolute top-50 start-50 translate-middle z-1"
          src={isPaused ? "src/assets/play.png" : "src/assets/pause.png"}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
          alt="Play/Pause"
        />
      </div>
      <div
        style={{ minWidth: "60vw" }}
        className="progress mb-3"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={duration}
      >
        <div className="progress-bar w-25"></div>
      </div>
    </div>
  );
}

export default AudioPlayer;
