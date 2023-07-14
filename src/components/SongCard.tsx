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
  let icon = playing ? "pause" : "play";

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
    <div className="card mt-3 mb-3 ms-3 me-3" style={{ width: "18rem" }}>
      <img src={track.image.url} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{track.title}</h5>
        <p className="card-text">{track.artists.join(",")}</p>
        <a
          href={track.link}
          className="btn btn-primary d-flex justify-content-center fs-5 bg-dark"
        >
          Listen on Spotify
        </a>
      </div>
    </div>
  );
}

export default SongCard;
