function Login() {
  const handleButtonClick = () => {
    window.location.href = "";
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
