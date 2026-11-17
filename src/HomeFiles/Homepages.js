
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

import homepc from "./homepc.png";
import AIChat from "./AIChat";
import ThemeToggle from "./themetoggle";

function Homepages() {
    return (
        <div className="app">

            {/* NAVBAR */}
            <header className="header">
                <div className="logo">
                    <h2>HBMS</h2>
                    <span>Hospital Management and bookingSystem</span>
                </div>

                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/About">About</Link>
                    <Link to="/AdminLogin">Admin Login</Link>
                    <Link to="/DoctorLogin">Doctor Login</Link>
                    <Link to="/UserRegistration">Register</Link>
                    <Link to="/HospitalLocations">HospitalLocation</Link>
                </nav>

                <div className="header-actions">
                    <ThemeToggle />
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="hero">

                {/* LEFT SIDE */}
                <div className="hero-left-content">

                    <div className="hero-text">
                        <p className="welcome">
                            WELCOME TO HBMS
                        </p>

                        <h1>
                            HOSPITAL
                            <span>MANAGEMENT AND BOOKING  SYSTEM</span>
                        </h1>

                        <p className="description">
                            Your Health Is Our Priority. HBMS helps
                            patients book appointments, find medical
                            services and access hospital information
                            easily and conveniently.
                        </p>

                        <div className="buttons">
                            <Link
                                to="/UserRegistration"
                                className="hero-btn"
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/About"
                                className="hero-btn secondary-btn"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* HERO IMAGE */}
                    <div className="image-container">
                        <img
                            src={homepc}
                            alt="Hospital Management System"
                        />
                    </div>

                </div>

                {/* RIGHT SIDE - AI ASSISTANT */}
                <div className="hero-ai-right">

                    <div className="ai-right-heading">
                        <span>🤖 SMART AI ASSISTANT</span>

                        <h2>
                            How Can We Help You Today?
                        </h2>

                        <p>
                            Ask questions about hospital services
                            and how to use HBMS.
                        </p>
                    </div>

                    <AIChat />

                </div>

            </section>

            {/* SERVICES SECTION */}
            <section className="services" id="services">

                <div className="section-heading">
                    <h2>OUR SERVICES</h2>
                    <p>
                        We provide simple and reliable hospital
                        management services.
                    </p>
                </div>

                <div className="services-container">

                    <div className="service-card">
                        <div className="service-icon">📅</div>
                        <h3>Online Appointment</h3>
                        <p>
                            Book hospital appointments easily
                            from anywhere.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">👨‍⚕️</div>
                        <h3>Doctor Management</h3>
                        <p>
                            View available medical departments
                            and services.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">🏥</div>
                        <h3>Hospital Locations</h3>
                        <p>
                            Find hospital locations and directions
                            easily.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">🤖</div>
                        <h3>AI Assistant</h3>
                        <p>
                            Get assistance about hospital services.
                        </p>
                    </div>

                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="how-it-works">

                <div className="section-heading">
                    <h2>HOW IT WORKS</h2>
                    <p>
                        Follow these simple steps to use HBMS.
                    </p>
                </div>

                <div className="steps-container">

                    <div className="step-card">
                        <span>01</span>
                        <h3>Create Account</h3>
                        <p>
                            Register your account to access HBMS.
                        </p>
                    </div>

                    <div className="step-card">
                        <span>02</span>
                        <h3>Login</h3>
                        <p>
                            Login to your account securely.
                        </p>
                    </div>

                    <div className="step-card">
                        <span>03</span>
                        <h3>Book Appointment</h3>
                        <p>
                            Choose a department and appointment time.
                        </p>
                    </div>

                    <div className="step-card">
                        <span>04</span>
                        <h3>Get Assistance</h3>
                        <p>
                            Receive information about your appointment.
                        </p>
                    </div>

                </div>
            </section>

            {/* FEATURES */}
            <section className="features">

                <div className="section-heading">
                    <h2>WHY CHOOSE HBMS?</h2>
                    <p>
                        Making healthcare services easier
                        and more accessible.
                    </p>
                </div>

                <div className="features-container">

                    <div className="feature">
                        <h3>✔ Easy to Use</h3>
                        <p>
                            Simple and friendly system for patients.
                        </p>
                    </div>

                    <div className="feature">
                        <h3>✔ Time Saving</h3>
                        <p>
                            Book appointments without unnecessary waiting.
                        </p>
                    </div>

                    <div className="feature">
                        <h3>✔ Secure Information</h3>
                        <p>
                            Patient information should be protected.
                        </p>
                    </div>

                </div>
            </section>

            {/* STATISTICS */}
            <section className="statistics">

                <div className="stat-card">
                    <h2>24/7</h2>
                    <p>Online Access</p>
                </div>

                <div className="stat-card">
                    <h2>100%</h2>
                    <p>Easy Access</p>
                </div>

                <div className="stat-card">
                    <h2>1</h2>
                    <p>Connected System</p>
                </div>

                <div className="stat-card">
                    <h2>AI</h2>
                    <p>Smart Assistance</p>
                </div>

            </section>

            {/* EMERGENCY SECTION */}
            <section className="emergency">

                <h2>NEED URGENT MEDICAL HELP?</h2>

                <p>
                    For emergencies, contact your local emergency
                    services or visit the nearest hospital.
                </p>

                <Link
                    to="/HospitalLocations"
                    className="emergency-btn"
                >
                    Find Hospital
                </Link>

            </section>

            {/* ABOUT SECTION */}
            <section className="about" id="about">

                <div className="about-content">
                    <h2>ABOUT HBMS</h2>

                    <p>
                        Hospital Booking and Management System
                        is designed to make healthcare services easier.
                        It helps patients book appointments, access
                        hospital information and find hospital locations.
                    </p>

                    <Link to="/About" className="about-btn">
                        Read More
                    </Link>
                </div>

            </section>

            {/* FOOTER */}
            <footer className="footer">

                <div className="footer-container">

                    <div className="footer-about">
                        <h2>HBMS</h2>
                        <p>
                            Hospital Booking and Management System.
                            Your Health Is Our Priority.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h3>Quick Links</h3>

                        <Link to="/">Home</Link>
                        <Link to="/About">About</Link>
                        <Link to="/UserRegistration">Register</Link>
                        <Link to="/AdminLogin">Admin Login</Link>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact Us</h3>

                        <p>📧 hbms@gmail.com</p>
                        <p>📞 +250 788 000 000</p>
                        <p>📍 Rwanda</p>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} HBMS.
                        All Rights Reserved.
                    </p>
                </div>

            </footer>

        </div>
    );
}

export default Homepages;
