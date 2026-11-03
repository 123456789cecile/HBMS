
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userregistration.css";

function UserRegistration() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.idNumber.trim() ||
      !formData.dob ||
      !formData.gender ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please complete all required fields.");
      return;
    }

    if (formData.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!formData.termsAccepted) {
      setMessage("Please accept the Terms and Conditions.");
      return;
    }

    if (formData.dob > new Date().toISOString().slice(0, 10)) {
      setMessage("Date of birth cannot be in the future.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            id_number: formData.idNumber.trim(),
            date_of_birth: formData.dob,
            gender: formData.gender,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      // Send the user to login after successful registration.
      navigate("/UserLogin", {
        state: {
          message: "Registration successful. Please log in.",
          email: formData.email.trim().toLowerCase(),
        },
      });
    } catch (error) {
      setMessage(
        error.message ||
          "Could not connect to the server. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-page">
      {/* HEADER */}
      <header className="registration-header">
        <a href="/" className="registration-logo">
          🏥 <span>HMS</span>
        </a>

        <a href="/" className="back-home">
          ← Back to Home
        </a>
      </header>

      {/* MAIN */}
      <main className="registration-main">
        <div className="registration-card">
          <div className="registration-icon">👤</div>

          <h1>Create Your Account</h1>

          <p className="registration-subtitle">
            Register to access our Hospital Management System
          </p>

          {/* REGISTRATION FORM */}
          <form
            className="registration-form"
            onSubmit={handleSubmit}
          >
            {/* FULL NAME */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>

              <div className="registration-input">
                <span>👤</span>

                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <div className="registration-input">
                <span>📧</span>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>

              <div className="registration-input">
                <span>📱</span>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            {/* ID NUMBER */}
            <div className="form-group">
              <label htmlFor="idNumber">ID Number</label>

              <div className="registration-input">
                <span>🪪</span>

                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  placeholder="Enter your ID number"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* DATE OF BIRTH AND GENDER */}
            <div className="two-columns">
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>

                <div className="registration-input">
                  <span>🎂</span>

                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    max={new Date().toISOString().slice(0, 10)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>

                <div className="registration-input">
                  <span>⚧️</span>

                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="registration-input">
                <span>🔒</span>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="password-button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="registration-input">
                <span>🔐</span>

                <input
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="password-button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* TERMS */}
            <label className="terms">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />

              <span>
                I agree to the{" "}
                <a href="#terms">Terms and Conditions</a>
              </span>
            </label>

            {/* MESSAGE */}
            {message && (
              <div
                className="registration-message"
                role="alert"
              >
                {message}
              </div>
            )}

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="already-account">
            <span>Already have an account?</span>{" "}

            <button
              type="button"
              className="registration-login-button"
              onClick={() => navigate("/UserLogin")}
            >
              Login here
            </button>
          </div>

          {/* INFORMATION */}
          <div className="registration-info">
            <h3>🏥 Why Register?</h3>

            <p>
              After registration, patients can access healthcare
              services more easily.
            </p>

            <div className="registration-features">
              <span>✓ Book Appointments</span>
              <span>✓ Find Medical Services</span>
              <span>✓ View Hospital Locations</span>
              <span>✓ Manage Your Profile</span>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="registration-footer">
        <p>
          © 2026 Hospital Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default UserRegistration;
