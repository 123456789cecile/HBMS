import React from "react";
import "./about.css";
import pic3 from "./pic3.png"; // Ifoto ya mbere
import pic2 from "./pic2.png"; // Ifoto ya kabiri

export default function About() {
  return (
    <div className="about-container">
      {/* 1. Hero Section */}
      <section className="about-hero">
        <h1>Welcome to HMS HealthCare System</h1>
        <p className="hero-subtitle">
          Revolutionizing healthcare management, patient care, and seamless appointment booking with cutting-edge digital technology.
        </p>
        <div className="about-image-wrapper">
          <img src={pic3} alt="Hospital Facility" className="about-img main-img" />
        </div>
      </section>

      {/* 2. Statistics Section (Igice cy'imibare y'ingenzi) */}
      <section className="about-stats">
        <div className="stat-card">
          <h3>15,000+</h3>
          <p>Happy Patients</p>
        </div>
        <div className="stat-card">
          <h3>50+</h3>
          <p>Expert Doctors</p>
        </div>
        <div className="stat-card">
          <h3>24/7</h3>
          <p>Emergency Care</p>
        </div>
        <div className="stat-card">
          <h3>100%</h3>
          <p>Secure Records</p>
        </div>
      </section>

      {/* 3. Mission & Vision Section */}
      <section className="about-mission-vision">
        <div className="card">
          <h2>Our Mission</h2>
          <p>
            To bridge the gap between patients and healthcare providers by offering an efficient, secure, and user-friendly platform for booking appointments, managing patient histories, and streamlining hospital operations.
          </p>
        </div>
        <div className="card">
          <h2>Our Vision</h2>
          <p>
            To become the leading digital healthcare ecosystem across the region, ensuring that every individual has immediate, equitable, and quality access to medical professionals.
          </p>
        </div>
      </section>

      {/* 4. Core Features Section */}
      <section className="about-features">
        <h2>Why Choose Our System?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Easy Doctor Booking</h3>
            <p>Schedule appointments with specialized doctors in just a few clicks from any device, anywhere.</p>
          </div>
          <div className="feature-item">
            <h3>Secure Patient Records</h3>
            <p>All medical history, prescriptions, and lab reports are encrypted and kept strictly confidential.</p>
          </div>
          <div className="feature-item">
            <h3>Real-time Notifications</h3>
            <p>Receive instant updates, reminders, and confirmations regarding your upcoming appointments.</p>
          </div>
          <div className="feature-item">
            <h3>Department Management</h3>
            <p>Easily navigate through various hospital departments like Cardiology, Pediatrics, Neurology, and more.</p>
          </div>
        </div>
      </section>

      {/* 5. Team & Facilities Showcase Section */}
      <section className="about-showcase">
        <div className="showcase-text">
          <h2>Dedicated Medical Professionals & Modern Facilities</h2>
          <p>
            Our hospital management system integrates top-tier medical expertise with advanced administrative tools. We empower doctors and staff to focus on what matters most: saving lives and delivering compassionate care.
          </p>
        </div>
        <div className="about-image-wrapper">
          <img src={pic2} alt="Medical Team at Work" className="about-img secondary-img" />
        </div>
      </section>
    </div>
  );
}