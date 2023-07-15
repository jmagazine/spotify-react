import { useState } from "react";
import PlayButton from "./PlayButton";

interface Props {
  track: Spotify.Track;
}

function SongCard({ track }: Props) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  let icon = playing ? "pause" : "play";

  // const handleClick = () => {
  //   if (!audio) {
  //     const newAudio = new Audio(track.);
  //     setAudio(newAudio);
  //     newAudio.play();
  //     setPlaying(true);
  //   } else {
  //     if (playing) {
  //       audio.pause();
  //     } else {
  //       audio.play();
  //     }
  //     setPlaying(!playing);
  //   }
  // };

  return (
    <div className="card d-flex flex-column" style={{ width: "10" }}>
      <img src={track.image.url} className="card-img-top" alt="..." />
      <div className="card-body d-flex flex-column flex-grow-1">
        <h5 className="card-title">{track.title}</h5>
        <p className="card-text">{track.artists.join(",")}</p>
        <a
          href={track.uri}
          className="d-flex flex-column btn btn-primary fs-4 mt-auto"
        >
          Listen on Spotify
        </a>
      </div>
    </div>
  );
}

export default SongCard;
