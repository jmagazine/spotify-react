import { useState, useEffect } from "react";

interface Props {
  playing: Spotify.Track | undefined;
}

function AudioPlayer({ playing }: Props) {
  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          <b> Instance active.</b>
          <img src={playing?.image && playing.image.url}></img>
        </div>
      </div>
    </>
  );
}

export default AudioPlayer;
