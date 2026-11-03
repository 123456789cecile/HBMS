
import "./about.css";
import { useState } from "react";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("Login information submitted successfully.");
  };

  return (
    <div className="App">

      {/* HEADER */}
      <header className="top-header">
        <div className="logo">
          🏥 <span>HMS</span>
        </div>

        <a href="/" className="home-link">
          ← Back to Home
        </a>
      </header>

      {/* MAIN CONTENT */}
      <main className="login-container">

        <div className="login-card">

          <div className="hospital-icon">
            🏥
          </div>

          <h1>Admin Login</h1>

          <p className="welcome">
            Welcome to our system
          </p>

          <p className="system-name">
            HOSPITAL MANAGEMENT SYSTEM
          </p>

          <form className="form" onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="input-group">
              <label htmlFor="email">Email Address</label>

              <div className="input-wrapper">
                <span>📧</span>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <span>🔒</span>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* ID NUMBER */}
            <div className="input-group">
              <label htmlFor="idNumber">ID Number</label>

              <div className="input-wrapper">
                <span>🪪</span>

                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  placeholder="Enter your ID number"
                  required
                />
              </div>
            </div>

            {/* OPTIONS */}
            <div className="login-options">

              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                className="forgot"
                onClick={() =>
                  setMessage(
                    "Please contact the system administrator to reset your password."
                  )
                }
              >
                Forgot Password?
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button type="submit" className="button">
              Login
            </button>

            {/* MESSAGE */}
            {message && (
              <p className="message">
                {message}
              </p>
            )}

          </form>

          {/* SIGN UP */}
          <p className="signup">
            If you do not have an account?
            <a href="/UserRegistration"> Sign Up</a>
          </p>

          {/* DESCRIPTION */}
          <div className="description">
            <h3>About Our System</h3>

            <p>
              Our Hospital Management System allows patients
              to book appointments with doctors online without
              wasting time going to the hospital.
            </p>

            <div className="features">
              <span>✓ Online Appointment</span>
              <span>✓ Doctor Management</span>
              <span>✓ Patient Management</span>
              <span>✓ Hospital Location</span>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          © 2026 Hospital Management System. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;