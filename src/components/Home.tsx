import { useState } from "react";
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
      {/* <AudioPlayer token={token} /> */}
    </div>
  );
}

export default Home;
