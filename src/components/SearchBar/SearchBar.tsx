import React, { useState, useRef } from "react";
import "./SearchBar.css";
import { Track } from "./../../Api";

import image from "../../assets/search.svg";
interface Props {
  setTracks: React.Dispatch<React.SetStateAction<Spotify.Track[]>>;
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
    <div
      className=" bg-dark container fluid d-flex flex-column justify-content-center align-items-center"
      style={{ maxWidth: "100vw" }}
    >
      <input
        ref={inputRef} // Assign the ref to the input element
        className="z-1 position-relative form-control form-control-lg"
        style={{ width: "60vw" }}
        type="text"
        placeholder="Search"
        aria-label=".form-control-lg example"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          if (e.target.value.length > 1) {
            handleSearch();
          } else {
            setTracks([]);
          }
        }}
        onKeyDown={handleKeyDown} // Call handleKeyPress function on key press
      />
      <div
        className="ms-auto bg-dark position-absolute d-flex w-50 "
        style={{ minWidth: "59vw" }}
      >
        <img
          src={image}
          alt="Logo"
          width="40"
          height="40"
          className={`z-1 ms-auto align-self-end ${
            vibrate && "vibrate-animation"
          }`}
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
