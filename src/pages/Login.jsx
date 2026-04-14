import logo from "../assets/images/li.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main className="login-screen">
      <div className="login-shell">
        <header className="login-branding">
          <div className="login-logo-pill">
            <img src={logo} alt="Glyde" className="login-logo-image" />
          </div>
          <p className="login-brand-subtitle">Merchant Portal</p>
        </header>

        <section className="login-card" aria-label="Login form">
          <h1>Log in</h1>
          <p className="login-contact">
            Don&apos;t have an account? <a href="#">Contact us</a>
          </p>

          <form className="login-form" onSubmit={handleLogin}>
            <label className="login-input-group">
              <span>Email address</span>
              <input type="email" placeholder="john.doe@email.com" />
            </label>

            <label className="login-input-group">
              <span>Password</span>
              <input type="password" placeholder="********" />
            </label>

            <button type="submit" className="login-submit-btn">
              Log in
            </button>
          </form>

          <Link to="/forgot-password" className="login-forgot-link">
            Forgot password?
          </Link>
        </section>

        <p className="login-help-text">
          Visit our <a href="#">Help Center</a> for any questions.
        </p>
      </div>
    </main>
  );
}