import SongCard from "./SongCard";
import "bootstrap/dist/css/bootstrap.css";
interface Props {
  tracks?: Spotify.Track[];
}

function SongsContainer({ tracks }: Props) {
  return (
    <div
      className=" d-flex postition-absolute top-0 bottom-0 flex-grow-1 flex-column bg-dark align-items-center"
      style={{ minWidth: "80vw" }}
    >
      <div
        className="mt-3 mb-3 justify-content-center d-flex flex-column"
        style={{ maxWidth: "70vw" }}
      >
        {tracks &&
          tracks.map((track) => <SongCard key={track.id} track={track} />)}
      </div>
    </div>
  );
}

export default SongsContainer;
