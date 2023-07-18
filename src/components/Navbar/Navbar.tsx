function Navbar() {
  return (
    <nav
      className="navbar bg-body-tertiary"
      style={{
        padding: "0",
      }}
    >
      <div
        className="container-fluid"
        style={{ marginTop: "0", backgroundColor: "#121212" }}
      >
        <a
          className="navbar-brand"
          href="#"
          style={{
            padding: "20px",
            fontSize: "2.1rem",
            color: "#FFFFFF",
            margin: "0",
          }}
        >
          <img
            src="./src/assets/spotify.png"
            alt="Logo"
            width="55"
            height="55"
            className="d-inline-block align-text-top"
            style={{ marginRight: "8px" }}
          />
          Spotify
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
