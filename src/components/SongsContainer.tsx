import SongCard from "./SongCard";
import { Track } from "./../Api";
interface Props {
  tracks?: Track[];
}

function SongsContainer({ tracks }: Props) {
  return (
    <div className="container-fluid bg-dark d-flex flex-row flex-wrap">
      {tracks &&
        tracks.map((track) => <SongCard key={track.id} track={track} />)}
    </div>
  );
}

export default SongsContainer;
