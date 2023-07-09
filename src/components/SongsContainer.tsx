import SongCard from "./SongCard";
import { Track } from "./../Api";
interface Props {
  tracks?: Track[];
}

function SongsContainer({ tracks }: Props) {
  return (
    <div
      className="container-fluid"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#121212",
        width: "90%",
        minHeight: "100vh",
        alignItems: "baseline",
        borderRadius: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "0 auto",
          marginInlineStart: "7%",
        }}
      >
        {tracks &&
          tracks.map((track) => <SongCard key={track.id} track={track} />)}
      </div>
    </div>
  );
}

export default SongsContainer;
