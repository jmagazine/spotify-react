import image from "../../assets/spotify.png";

function Navbar() {
  return (
    <nav className="p-0 navbar bg-body-tertiary">
      <div className="bg-dark container-fluid d-flex align-items-center">
        <a
          className="d-flex text-white fs-1 navbar-brand align-items-center"
          href="#"
        >
          <img
            src={image}
            alt="Logo"
            width="70"
            height="70"
            className="me-2 d-inline-block"
          />
          Spotify
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
