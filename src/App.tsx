import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SongsContainer from "./components/SongsContainer";
import { useEffect, useState } from "react";
import { Track } from "./Api";
import Login from "./Login";

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    async function getToken() {
      const response = await fetch(
        "https://spotify-search-p8vf.onrender.com/auth/token"
      );
      const json = await response.json();
      setToken(json.access_token ? json.access_token : "");
    }
    getToken();
    console.log(token);
  }, []);

  const tokenView = (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <SearchBar setTracks={setTracks} />
        <div style={{ marginTop: "20px" }}>
          <SongsContainer tracks={tracks} />
        </div>
      </div>
    </>
  );

  const loginView = (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <SearchBar setTracks={setTracks} />
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Login />
        </div>
      </div>
    </>
  );

  return token !== "" ? tokenView : loginView;
}

export default App;
