import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SongsContainer from "./components/SongsContainer";
import { useEffect, useState } from "react";
import Login from "./LoginButton";
import Home from "./components/Home";
import AudioPlayer from "./components/AudioPlayer";

function App() {
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
  }, []);

  return token !== "" ? <Home token={token} /> : <Login />;
}

export default App;
