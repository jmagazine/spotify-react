import { useState } from "react";
import PlayButton from "./PlayButton";

interface Props {
  track: Spotify.Track;
}

function SongCard({ track }: Props) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (!audio) {
      const newAudio = new Audio(track.link);
      setAudio(newAudio);
      newAudio.play();
      setPlaying(true);
    } else {
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div
      className={`d-flex rounded-1 align-items-center 
    border-top border-end border-dark
     bg-body-secondary ${hovered && "bg-dark-subtle"}`}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={() => {
        window.location.href = track.link;
      }}
      style={{ width: "60vw", height: "15vh" }}
    >
      <div onClick={handleClick}>
        <img
          src={track.image.url}
          className="card-img-top"
          alt="..."
          style={{ position: "relative", zIndex: 0 }}
        />
        {hovered && <PlayButton isPlaying={playing} />}
      </div>
      <div className="card-body d-flex flex-column">
        <div>
          <h5 className="card-title">{track.title}</h5>
          <p className="card-text">{track.artists.join(", ")}</p>
        </div>
        <div className="mt-auto">
          <a
            style={{ minWidth: "100%" }}
            href={track.link}
            target="_blank"
            className="btn btn-primary btn-full-width"
          >
            Listen on Spotify
          </a>
        </div>
        <div>
          <h5>{track.artists.join(", ")}</h5>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
