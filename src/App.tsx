import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import SearchBar from "./components/SearchBar/SearchBar";
import SongsContainer from "./components/SongsContainer";
import { useEffect, useState } from "react";
import Login from "./Login";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [tracks, setTracks] = useState<Spotify.Track[]>([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    async function getToken() {
      const response = await fetch("http://localhost:4000/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  const tokenView = (
    <>
      <div
        className="position-relative z-0 p-0 d-flex mb-3 flex-column justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Navbar />
        <SearchBar setTracks={setTracks} />
        <SongsContainer tracks={tracks} />
      </div>
      <div
        className="d-flex flex-column position-fixed bottom-0 z-1 bg-white"
        style={{ width: "100%" }}
      >
        <AudioPlayer track={tracks[0]} token={token} />
      </div>
    </>
  );

  const loginView = (
    <div className="p-0 d-flex mb-3 flex-column justify-content-center">
      <Navbar />
      <SearchBar setTracks={setTracks} />
      <div className="d-flex justify-content-center">
        <Login />
      </div>
    </div>
  );

  return token !== "" ? tokenView : loginView;
}

export default App;
