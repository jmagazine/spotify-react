function Login() {
  const handleButtonClick = () => {
    window.location.href = "http://localhost:4000/auth/token";
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
