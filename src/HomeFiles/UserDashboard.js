
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const API_URL = "http://localhost:5000/api";

// Medical services: doctor names are not shown to patients.
const doctors = [
  { id: 1, specialty: "General Medicine", availability: "Available" },
  { id: 2, specialty: "Pediatrics", availability: "Available" },
  { id: 3, specialty: "Cardiology", availability: "Available" },
   { id: 4, specialty: "psychology", availability: "Available" },
   { id: 5, specialty: "Dermatologist", availability: "Available" },
   { id: 6, specialty: "Ophthalmologist", availability: "Available" },  
    { id: 7, specialty: "Denthis", availability: "Available" },
];

const menuItems = [
  "Home",
  "Book Appointment",
  "My Appointments",
  "Doctors",
  "Hospital Locations",
  "My Profile",
];

function UserDashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("Home");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState("");

  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const patientEmail = localStorage.getItem("userEmail") || "";

  const [appointments, setAppointments] = useState([]);

  // Today's date in YYYY-MM-DD format.
  const today = new Date();

  const todayDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // Load appointments from the backend.
  // The matching GET endpoint must exist in server.js.
  const loadAppointments = useCallback(async () => {
    if (!patientEmail) {
      setAppointments([]);
      setAppointmentsError("Please log in with your patient account.");
      return;
    }

    try {
      setIsLoadingAppointments(true);
      setAppointmentsError("");

      const response = await fetch(
        `${API_URL}/patient/appointments?email=${encodeURIComponent(
          patientEmail
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load your appointments."
        );
      }

      const records = Array.isArray(data)
        ? data
        : data.appointments || [];

      // Convert database column names to the format used by this UI.
      const formattedAppointments = records.map((item) => ({
        id: item.appointment_id ?? item.id,
        doctor: item.specialty_name || item.specialty || item.doctor || "",
        date: item.appointment_date
          ? String(item.appointment_date).slice(0, 10)
          : item.date || "",
        time: item.appointment_time || item.time || "",
        reason: item.reason || "",
        status: item.status || "Pending",
      }));

      setAppointments(formattedAppointments);
    } catch (error) {
      setAppointmentsError(
        error.message || "Could not connect to the backend."
      );
    } finally {
      setIsLoadingAppointments(false);
    }
  }, [patientEmail]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const myAppointments = appointments;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  // Submit appointment to Node.js backend.
  const handleBooking = async (event) => {
    event.preventDefault();

    if (
      !formData.doctor ||
      !formData.date ||
      !formData.time ||
      !formData.reason.trim()
    ) {
      setMessage("Please complete all fields.");
      return;
    }

    if (formData.date < todayDate) {
      setMessage("Please choose today or a future date.");
      return;
    }

    if (!patientEmail) {
      setMessage("Please log in before booking an appointment.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientEmail,
          specialty: formData.doctor,
          date: formData.date,
          time: formData.time,
          reason: formData.reason.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit appointment."
        );
      }

      setFormData({
        doctor: "",
        date: "",
        time: "",
        reason: "",
      });

      setMessage("Appointment submitted successfully!");
      setActivePage("My Appointments");

      // Reload the saved record from MySQL through the backend.
      await loadAppointments();
    } catch (error) {
      setMessage(
        error.message ||
          "Unable to connect to the backend. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    navigate("/UserLogin");
  };

  const openPage = (page) => {
    setActivePage(page);
    setMessage("");
  };

  // HOME PAGE.
  const renderHome = () => (
    <>
      <div className="dashboard-welcome">
        <div>
          <p className="eyebrow">PATIENT PORTAL</p>
          <h1>Welcome to HMS</h1>
          <p>
            Manage your appointments and find the medical care you need.
          </p>

          <button
            className="primary-button"
            onClick={() => openPage("Book Appointment")}
          >
            Book an Appointment
          </button>
        </div>

        <div className="welcome-icon" aria-hidden="true">
          ✚
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span>My Appointments</span>
          <strong>{myAppointments.length}</strong>
        </div>

        <div className="stat-card">
          <span>Medical Services</span>
          <strong>{doctors.length}</strong>
        </div>

        <div className="stat-card">
          <span>Pending</span>
          <strong>
            {myAppointments.filter(
              (appointment) => appointment.status === "Pending"
            ).length}
          </strong>
        </div>
      </div>

      <section className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <button onClick={() => openPage("Book Appointment")}>
            <span>＋</span> Book Appointment
          </button>

          <button onClick={() => openPage("My Appointments")}>
            <span>▤</span> View My Appointments
          </button>

          <button onClick={() => openPage("Doctors")}>
            <span>✚</span> View Medical Services
          </button>
        </div>
      </section>
    </>
  );

  // BOOK APPOINTMENT PAGE.
  const renderBooking = () => (
    <section className="dashboard-section">
      <h1>Book an Appointment</h1>

      <p className="section-description">
        Choose the medical service you need and complete the form.
      </p>

      {message && (
        <div
          className={`form-message ${
            message.includes("successfully") ? "success" : "error"
          }`}
          role="status"
        >
          {message}
        </div>
      )}

      <form className="appointment-form" onSubmit={handleBooking}>
        <label htmlFor="doctor">Select Medical Service</label>

        <select
          id="doctor"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          required
        >
          <option value="">Choose a medical service</option>

          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.specialty}>
              {doctor.specialty}
            </option>
          ))}
        </select>

        <div className="form-row">
          <div>
            <label htmlFor="date">Appointment Date</label>

            <input
              id="date"
              type="date"
              name="date"
              min={todayDate}
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="time">Appointment Time</label>

            <input
              id="time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label htmlFor="reason">Reason for Appointment</label>

        <textarea
          id="reason"
          name="reason"
          rows="4"
          placeholder="Briefly explain why you need an appointment"
          value={formData.reason}
          onChange={handleChange}
          required
        />

        <button
          className="primary-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Appointment"}
        </button>
      </form>
    </section>
  );

  // MY APPOINTMENTS PAGE.
  const renderAppointments = () => (
    <section className="dashboard-section">
      <div className="section-heading-row">
        <div>
          <h1>My Appointments</h1>
          <p className="section-description">
            View your appointment requests and their status.
          </p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={loadAppointments}
          disabled={isLoadingAppointments}
        >
          {isLoadingAppointments ? "Loading..." : "Refresh"}
        </button>
      </div>

      {message && (
        <div
          className={`form-message ${
            message.includes("successfully") ? "success" : "error"
          }`}
          role="status"
        >
          {message}
        </div>
      )}

      {appointmentsError && (
        <div className="form-message error" role="alert">
          {appointmentsError}
        </div>
      )}

      {isLoadingAppointments ? (
        <p>Loading your appointments...</p>
      ) : myAppointments.length === 0 ? (
        <div className="empty-state">
          <span>▤</span>
          <h3>No appointments yet</h3>
          <p>Your saved appointment requests will appear here.</p>

          <button
            className="primary-button"
            onClick={() => openPage("Book Appointment")}
          >
            Book Your First Appointment
          </button>
        </div>
      ) : (
        <div className="appointment-list">
          {myAppointments.map((appointment) => (
            <article
              className="appointment-card"
              key={appointment.id}
            >
              <div className="appointment-card-top">
                <h3>Appointment Details</h3>

                <span
                  className={`status-badge ${
                    (appointment.status || "Pending").toLowerCase()
                  }`}
                >
                  {appointment.status || "Pending"}
                </span>
              </div>

              <p>
                <strong>Medical Service:</strong>{" "}
                {appointment.doctor}
              </p>

              <p>
                <strong>Date:</strong> {appointment.date}
              </p>

              <p>
                <strong>Time:</strong> {appointment.time}
              </p>

              <p>
                <strong>Reason:</strong> {appointment.reason}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );

  // MEDICAL SERVICES PAGE.
  const renderDoctors = () => (
    <section className="dashboard-section">
      <h1>Medical Services</h1>

      <p className="section-description">
        Browse the medical services available at our clinic.
      </p>

      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <article className="doctor-card" key={doctor.id}>
            <div className="doctor-avatar">✚</div>

            <h3>{doctor.specialty}</h3>
            <p>Medical Service</p>

            <span className="doctor-availability">
              {doctor.availability}
            </span>

            <button
              className="primary-button"
              onClick={() => {
                setFormData((previous) => ({
                  ...previous,
                  doctor: doctor.specialty,
                }));

                openPage("Book Appointment");
              }}
            >
              Book Appointment
            </button>
          </article>
        ))}
      </div>
    </section>
  );

  // HOSPITAL LOCATIONS PAGE.
  const renderLocations = () => (
    <section className="dashboard-section">
      <h1>Hospital Locations</h1>

      <p className="section-description">
        Find information about our clinic.
      </p>

      <div className="location-card">
        <div className="location-icon">⌖</div>

        <div>
          <h3>Kira Clinic</h3>
          <p>Nyagatare, Rwanda</p>
          <p>Contact: 0781123456</p>
        </div>
      </div>

      <p className="demo-note">
        This is the current sample location. Verified hospital
        locations and a map can be added later.
      </p>
    </section>
  );

  // PATIENT PROFILE PAGE.
  const renderProfile = () => (
    <section className="dashboard-section">
      <h1>My Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">👤</div>

        <h2>Patient Profile</h2>

        <p>
          <strong>Email:</strong>{" "}
          {patientEmail || "No patient email found"}
        </p>

        <p className="demo-note">
          Additional profile details can be loaded from the database
          after the profile API is implemented.
        </p>
      </div>
    </section>
  );

  // SELECT PAGE CONTENT.
  const renderContent = () => {
    switch (activePage) {
      case "Book Appointment":
        return renderBooking();

      case "My Appointments":
        return renderAppointments();

      case "Doctors":
        return renderDoctors();

      case "Hospital Locations":
        return renderLocations();

      case "My Profile":
        return renderProfile();

      default:
        return renderHome();
    }
  };

  // MAIN DASHBOARD.
  return (
    <div className="hms-dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">✚</div>

          <div>
            <h2>Kira Clinic</h2>
            <span>Patient Portal</span>
          </div>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

        <nav
          className="sidebar-menu"
          aria-label="Patient dashboard"
        >
          {menuItems.map((item, index) => (
            <button
              key={item}
              className={`sidebar-link ${
                activePage === item ? "active" : ""
              }`}
              onClick={() => openPage(item)}
            >
              <span className="menu-icon">
                {["⌂", "＋", "▤", "✚", "⌖", "👤"][index]}
              </span>

              {item === "Doctors" ? "Medical Services" : item}
            </button>
          ))}
        </nav>

        <button
          className="sidebar-link logout-link"
          onClick={handleLogout}
        >
          <span className="menu-icon">↪</span>
          Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="topbar-label">
              HOSPITAL MANAGEMENT SYSTEM
            </p>

            <h2>
              {activePage === "Doctors"
                ? "Medical Services"
                : activePage}
            </h2>
          </div>

          <div className="topbar-user">
            <div className="small-avatar">👤</div>

            <div>
              <strong>Patient</strong>
              <span>{patientEmail || "Please log in"}</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {renderContent()}
        </div>

        <footer className="dashboard-footer">
          © {new Date().getFullYear()} Kira Clinic · Patient Portal
        </footer>
      </main>
    </div>
  );
}

export default UserDashboard;
