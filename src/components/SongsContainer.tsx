import SongCard from "./SongCard";
import "bootstrap/dist/css/bootstrap.css";
interface Props {
  tracks?: Spotify.Track[];
}

function SongsContainer({ tracks }: Props) {
  return (
    <div
      className=" d-flex flex-column bg-dark align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="mt-3 mb-3 justify-content-center d-flex flex-wrap"
        style={{ gap: "20px" }}
      >
        {tracks &&
          tracks.map((track) => <SongCard key={track.id} track={track} />)}
        l
      </div>
    </div>
  );
}

export default SongsContainer;
