
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./UserLogin.css";

function UserLogin() {
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(location.state?.email || "");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(
        location.state?.message || ""
    );
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!email.trim() || !password) {
            setMessage("Please enter your email and password.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.trim().toLowerCase(),
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message || "Login failed. Please try again."
                );
                return;
            }

            if (!data.user || !data.token) {
                setMessage("Invalid response from the server.");
                return;
            }

            // Save logged-in user and authentication token.
            sessionStorage.setItem(
                "hmsUser",
                JSON.stringify(data.user)
            );

            sessionStorage.setItem("hmsToken", data.token);

            setMessage("Login successful!");

            navigate("/UserDashboard", { replace: true });

        } catch (error) {
            console.error("User login connection error:", error);

            setMessage(
                "Could not connect to the server. Please check that your backend is running on port 5000."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-login-page">

            <header className="user-login-header">
                <Link to="/" className="user-login-logo">
                    🏥 <span>HMS</span>
                </Link>

                <Link to="/" className="user-back-home">
                    ← Back to Home
                </Link>
            </header>

            <main className="user-login-main">
                <div className="user-login-card">

                    <div className="user-login-icon">
                        👤
                    </div>

                    <h1>User Login</h1>

                    <p className="user-login-subtitle">
                        Welcome back! Login to access your account
                    </p>

                    <p className="system-title">
                        HOSPITAL MANAGEMENT SYSTEM
                    </p>

                    <form
                        className="user-login-form"
                        onSubmit={handleLogin}
                    >

                        <div className="user-input-group">
                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="user-input-box">
                                <span>📧</span>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="user-input-group">
                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="user-input-box">
                                <span>🔒</span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="user-show-password"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>

                        <div className="user-login-options">

                            <label className="user-remember">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>

                            <button
                                type="button"
                                className="user-forgot"
                                onClick={() =>
                                    setMessage(
                                        "Please contact the system administrator to reset your password."
                                    )
                                }
                            >
                                Forgot Password?
                            </button>

                        </div>

                        <button
                            type="submit"
                            className="user-login-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Login to Account"}
                        </button>

                        {message && (
                            <div
                                className="user-login-message"
                                role="status"
                                aria-live="polite"
                            >
                                {message}
                            </div>
                        )}

                    </form>

                    <div className="create-account">
                        <span>Don't have an account?</span>{" "}
                        <Link to="/UserRegistration">
                            Create Account
                        </Link>
                    </div>

                    <div className="user-login-info">
                        <h3>🏥 Patient Services</h3>

                        <p>
                            After logging in, you can access healthcare
                            services through our system.
                        </p>

                        <div className="user-services">
                            <span>✓ Book Appointment</span>
                            <span>✓ Find Doctors</span>
                            <span>✓ View Hospital Location</span>
                            <span>✓ Manage Profile</span>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="user-login-footer">
                <p>
                    © 2026 Hospital Management System.
                    All Rights Reserved.
                </p>
            </footer>

        </div>
    );
}

export default UserLogin;
