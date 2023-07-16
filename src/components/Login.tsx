import LoginButton from "../LoginButton";
import Navbar from "./Navbar/Navbar";

function Login() {
  return (
    <div className="p-0 d-flex mb-3 flex-column justify-content-center">
      <Navbar />
      <div className="d-flex justify-content-center">
        <LoginButton />
      </div>
    </div>
  );
}

export default Login;
