interface Props {
  isPlaying: boolean;
}

import play from "../assets/play.png";
import pause from "../assets/pause.png";

function PlayButton({ isPlaying }: Props) {
  return (
    <img
      src={isPlaying ? play : pause}
      alt="..."
      style={{
        position: "absolute",
        top: "-5%",
        left: "-12%",
        transform: "translate(-50%, -50%)",
        scale: "0.3",
        opacity: "0.7",
      }}
    ></img>
  );
}

export default PlayButton;
