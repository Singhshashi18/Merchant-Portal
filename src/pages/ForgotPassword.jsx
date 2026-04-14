import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Flame, Shield, Sparkles, Triangle } from "lucide-react";
import logo from "../assets/images/li.png";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleLoginRedirect = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <main className="forgot-screen">
      <div className="forgot-shell">
        <header className="forgot-branding">
          <div className="forgot-logo-pill">
            <img src={logo} alt="Glyde" className="forgot-logo-image" />
          </div>
          <p className="forgot-brand-subtitle">Merchant Portal</p>
        </header>

        <section className="forgot-card" aria-label="Reset password form">
          <h1>Reset Password</h1>
          <p className="forgot-contact">
            Don&apos;t have an account? <a href="#">Register</a>
          </p>

          <form className="forgot-form" onSubmit={handleLoginRedirect}>
            <label className="forgot-input-group">
              <span>Email address</span>
              <input type="email" defaultValue="john.doe@email.com" />
            </label>

            <label className="forgot-input-group">
              <span>Password</span>
              <input type="password" defaultValue="********" />
            </label>

            <button type="submit" className="forgot-submit-btn">
              Log in
            </button>
          </form>

          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </section>

        <footer className="forgot-help-wrap" aria-label="Documentation links">
          <p className="forgot-help-text">
            Visit our <a href="#">docs</a> and find out how to switch between
          </p>
          <div className="forgot-help-logos" aria-hidden="true">
            <Triangle className="forgot-help-icon is-gold" size={30} strokeWidth={2.3} />
            <Shield className="forgot-help-icon is-slate" size={29} strokeWidth={2.2} />
            <Flame className="forgot-help-icon is-silver" size={28} strokeWidth={2.1} />
            <Sparkles className="forgot-help-icon is-ash" size={28} strokeWidth={2.2} />
          </div>
        </footer>
      </div>
    </main>
  );
}