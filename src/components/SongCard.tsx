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
      style={{ width: "60vw", height: "15vh" }}
    >
      <img
        className="p-3 rounded-5"
        style={{ width: "10%" }}
        src={!track || !track.image || !track.image.url ? "" : track.image.url}
        alt={track.title}
      />
      <div
        className="ms-1 d-flex flex-column justify-content-start"
        style={{ maxWidth: "50vw" }}
      >
        <div
          style={{
            maxWidth: "50vw",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <h1
            style={{
              maxWidth: "50vw",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {track.title}
          </h1>
        </div>
        <div>
          <h5>{track.artists.join(", ")}</h5>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
