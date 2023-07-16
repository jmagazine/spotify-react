import { useState, useEffect } from "react";
import Login from "../LoginButton";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./SearchBar/SearchBar";
import SongsContainer from "./SongsContainer";
import AudioPlayer from "./AudioPlayer";

interface Props {
  token: string;
}
function Home({ token }: Props) {
  const [tracks, setTracks] = useState<Spotify.Track[]>([]);
  const [track, setTrack] = useState<Spotify.Track>();
  const [playing, setPlaying] = useState<Spotify.Track>();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  // const [current_track, setTrack] = useState(track);
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
            setPlaying(state.track_window.current_track);
            setPaused(state.paused);

            player.getCurrentState().then((state) => {
              !state ? setActive(false) : setActive(true);
            });
          });
        }
      };
    }
  }, [ready]);

  return (
    <div className="d-flex flex-column justify-content-center">
      <Navbar />
      <SearchBar setTracks={setTracks} />
      <div
        className="d-flex justify-content-center"
        style={{ minHeight: "87.6vh" }}
      >
        <SongsContainer tracks={tracks} />
      </div>
      <AudioPlayer playing={playing} />
    </div>
  );
}

export default Home;
