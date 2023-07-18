import React, { useState, useRef } from "react";
import "./SearchBar.css";
import { Track } from "./../../Api";
interface Props {
  setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
}
function SearchBar({ setTracks }: Props) {
  const [vibrate, setVibrate] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const query = searchText.split(" ").join("+");
    try {
      const response = await fetch(
        `https://spotify-search-p8vf.onrender.com/search/${query}`
      );
      if (response.ok) {
        const data = await response.json();
        setTracks(data);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Bad Error:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      handleSearch();
      if (inputRef.current) inputRef.current.blur(); // Remove focus from the input element
    }
  };

  return (
    <div className="mt-3">
      <div className="container fluid" style={{ position: "relative" }}>
        <input
          ref={inputRef} // Assign the ref to the input element
          style={{ position: "absolute", zIndex: "0" }}
          className="form-control form-control-lg"
          type="text"
          placeholder="Search"
          aria-label=".form-control-lg example"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown} // Call handleKeyPress function on key press
        />
        <img
          src="./src/assets/search.svg"
          alt="Logo"
          width="40"
          height="40"
          className={`d-inline-block align-text-top ${
            vibrate && "vibrate-animation"
          }`}
          style={{
            position: "relative",
            float: "right",
            zIndex: "1",
            marginTop: "5px",
            marginRight: "-10px",
          }}
          draggable="false"
          onMouseEnter={() => setVibrate(true)}
          onAnimationEnd={() => setVibrate(false)}
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default SearchBar;
