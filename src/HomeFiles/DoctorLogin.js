
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DoctorLogin.css";

function DoctorLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/doctor/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed.");
        return;
      }

      if (data.user?.role !== "doctor") {
        setMessage("This account is not a doctor account.");
        return;
      }

      sessionStorage.setItem("hmsDoctor", JSON.stringify(data.user));
      navigate("/DoctorDashboard", { replace: true });
    } catch (error) {
      console.error("Doctor login error:", error);
      setMessage("Cannot connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-login-page">
      <header className="doctor-login-header">
        <Link to="/" className="doctor-login-logo">
          🏥 <span>HMS</span>
        </Link>
        <Link to="/" className="doctor-login-home">
          ← Back to Home
        </Link>
      </header>

      <main className="doctor-login-main">
        <section className="doctor-login-card">
          <div className="doctor-login-icon">🩺</div>
          <p className="doctor-login-eyebrow">MEDICAL PROFESSIONALS</p>
          <h1>Doctor Login</h1>
          <p className="doctor-login-subtitle">
            Sign in to manage your appointments and patient care.
          </p>

          <form onSubmit={handleLogin}>
            <div className="doctor-login-field">
              <label htmlFor="doctor-email">Email Address</label>
              <input
                id="doctor-email"
                type="email"
                placeholder="Enter your registered email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="doctor-login-field">
              <label htmlFor="doctor-password">Password</label>
              <div className="doctor-password-box">
                <input
                  id="doctor-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="doctor-login-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>

            {message && (
              <p className="doctor-login-message" role="alert">
                {message}
              </p>
            )}
          </form>

          <p className="doctor-login-register">
            Don't have a doctor account?{" "}
            <Link to="/DoctorRegistration">Register here</Link>
          </p>

          <div className="doctor-login-note">
            <strong>🔐 Secure access</strong>
            <p>
              Only approved doctor accounts should access doctor services.
              Contact the hospital administrator if your account is pending.
            </p>
          </div>
        </section>
      </main>

      <footer className="doctor-login-footer">
        © 2026 Hospital Management System. All Rights Reserved.
      </footer>
    </div>
  );
}

export default DoctorLogin;
