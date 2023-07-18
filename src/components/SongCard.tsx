import { Track } from "../Api";
import { useState } from "react";
import PlayButton from "./PlayButton";

interface Props {
  track: Track;
}

function SongCard({ track }: Props) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (!audio) {
      const newAudio = new Audio(track.preview);
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card"
      style={{
        width: "18rem",
        justifyContent: "space-around",
        scale: "95%",
        marginTop: "3%",
      }}
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
      </div>
    </div>
  );
}

export default SongCard;
