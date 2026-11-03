
import { Component } from "react";
import { Link } from "react-router-dom";
import homepc from "./homepc.png";
import Image from "./image.png"
import "../App.css";
import useTranslatedText from "../useTranslatedText";

// Component ntoya ihindura amagambo ikoresheje translation hook
function T({ text }) {
  const translated = useTranslatedText(text);
  return <>{translated}</>;
}

class App extends Component {
  render() {
    return (
      <div className="homepage">
        {/* NAVBAR */}
        <header className="header">
          <div className="logo">
            🏥 <span>HBMS</span>
          </div>

          <nav className="navbar">
            <Link to="/"><T text="HOME" /></Link>
            <Link to="/About"><T text="ABOUT" /></Link>
            <Link to="/AdminLogin"><T text="ADMIN LOGIN" /></Link>
            <Link to="/DoctorLogin"><T text="DOCTOR LOGIN" /></Link>
            <Link to="/UserRegistration">
              <T text="USER REGISTRATION" />
            </Link>
          </nav>
        </header>

        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-text">
            <p className="welcome">
              <T text="WELCOME TO HMS" />
            </p>

            <h1>
              <T text="HOSPITAL" />
              <span><T text="MANAGEMENT SYSTEM" /></span>
            </h1>

            <p className="description">
              <T text="A smart and reliable hospital management platform designed to connect patients, doctors and hospitals in one easy-to-use system." />
            </p>

            <div className="buttons">
              <Link to="/UserRegistration">
                <button className="primary-btn">
                  <T text="Register Now" />
                </button>
              </Link>

              <a href="#services">
                <button className="secondary-btn">
                  <T text="Explore Services" />
                </button>
              </a>
            </div>
          </div>

          <div className="image-container">
            <img
              src={homepc}
              alt="Hospital Management System"
            />
          </div>
        </section>

        {/* SERVICES */}
        <section className="services" id="services">
          <div className="section-title">
            <p><T text="OUR SERVICES" /></p>
            <h2><T text="What Our System Provides" /></h2>
            <span>
              <T text="Simple and smart healthcare management for everyone." />
            </span>
          </div>

          <div className="service-container">
            <div className="service-card">
              <div className="service-icon">📅</div>
              <h3><T text="Appointment Booking" /></h3>
              <p>
                <T text="Patients can book appointments with available doctors without wasting time." />
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">👨‍⚕️</div>
              <h3><T text="Available Doctors" /></h3>
              <p>
                <T text="Patients can view active doctors and choose the doctor they need." />
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">📍</div>
              <h3><T text="Hospital Location" /></h3>
              <p>
                <T text="Find hospital locations and get directions using an integrated map." />
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚑</div>
              <h3><T text="Emergency Support" /></h3>
              <p>
                <T text="Quickly find important hospital information when emergency healthcare is needed." />
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-it-works">
          <div className="section-title">
            <p><T text="HOW IT WORKS" /></p>
            <h2><T text="Easy Steps To Get Healthcare" /></h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3><T text="Create Account" /></h3>
              <p>
                <T text="Register as a patient and create your account." />
              </p>
            </div>

            <div className="step">
              <div className="step-number">02</div>
              <h3><T text="Find a Doctor" /></h3>
              <p>
                <T text="View available doctors and select the doctor you need." />
              </p>
            </div>

            <div className="step">
              <div className="step-number">03</div>
              <h3><T text="Book Appointment" /></h3>
              <p>
                <T text="Choose your preferred date and time for consultation." />
              </p>
            </div>

            <div className="step">
              <div className="step-number">04</div>
              <h3><T text="Visit Hospital" /></h3>
              <p>
                <T text="Use the map to find the hospital and reach your appointment." />
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <div className="feature-image">
            <img src={Image} alt="Healthcare" />
          </div>

          <div className="feature-text">
            <p className="small-title">
              <T text="WHY CHOOSE HMS?" />
            </p>

            <h2>
              <T text="Making Healthcare" />
              <span><T text="Simple & Accessible" /></span>
            </h2>

            <p>
              <T text="Our Hospital Management System provides a simple way for patients and hospitals to manage healthcare services digitally." />
            </p>

            <div className="feature-list">
              <p>✓ <T text="Easy appointment booking" /></p>
              <p>✓ <T text="Active doctor management" /></p>
              <p>✓ <T text="Hospital location and navigation" /></p>
              <p>✓ <T text="Secure patient registration" /></p>
              <p>✓ <T text="Simple hospital management" /></p>
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="statistics">
          <div className="stat">
            <h2>100+</h2>
            <p><T text="Patients" /></p>
          </div>

          <div className="stat">
            <h2>25+</h2>
            <p><T text="Doctors" /></p>
          </div>

          <div className="stat">
            <h2>10+</h2>
            <p><T text="Departments" /></p>
          </div>

          <div className="stat">
            <h2>24/7</h2>
            <p><T text="Healthcare Support" /></p>
          </div>
        </section>

        {/* EMERGENCY */}
        <section className="emergency">
          <div>
            <p><T text="NEED MEDICAL HELP?" /></p>
            <h2><T text="Find The Right Hospital For You" /></h2>
            <span>
              <T text="Register today and access healthcare services easily." />
            </span>
          </div>

          <Link to="/UserRegistration">
            <button className="emergency-btn">
              <T text="Get Started" />
            </button>
          </Link>
        </section>

        {/* ABOUT */}
        <section className="about" id="about">
          <div className="section-title">
            <p><T text="ABOUT HMS" /></p>
            <h2>
              <T text="About Hospital Management System" />
            </h2>
          </div>

          <div className="about-content">
            <p>
              <T text="Hospital Management System is a digital platform designed to make healthcare services easier and more accessible." />
            </p>

            <p>
              <T text="Patients can register, find available doctors, book appointments and locate hospitals using a map." />
            </p>

            <p>
              <T text="Hospital administrators can manage doctors, patients and appointments through the system." />
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-about">
              <h2>🏥 HMS</h2>
              <p>
                <T text="Smart healthcare management for patients, doctors and hospitals." />
              </p>
            </div>

            <div className="footer-links">
              <h3><T text="QUICK LINKS" /></h3>
              <Link to="/"><T text="Home" /></Link>
              <Link to="/About"><T text="About" /></Link>
              <Link to="/AdminLogin"><T text="Admin Login" /></Link>
              <Link to="/UserRegistration">
                <T text="User Registration" />
              </Link>
            </div>

            <div className="footer-contact">
              <h3><T text="CONTACT US" /></h3>
              <p>📧 hms@gmail.com</p>
              <p>📞 0787776544</p>
              <p>📘 Facebook: HMS</p>
              <p>𝕏 X: HMS123</p>
            </div>

            <div className="footer-about">
              <h3><T text="LOCATION" /></h3>
              <p>📍 <T text="Rwanda" /></p>
              <p>🏥 <T text="Hospital Management System" /></p>
            </div>
          </div>

          <div className="copyright">
            <p>
              © 2026 <T text="Hospital Management System. All Rights Reserved." />
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
