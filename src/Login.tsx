function Login() {
  const handleButtonClick = () => {
    window.location.href =
      "https://spotify-search-p8vf.onrender.com/auth/login";
  };
  return (
    <button
      type="button"
      className="btn btn-primary btn-lg"
      onClick={handleButtonClick}
    >
      Login with Spotify
    </button>
  );
}

export default Login;
