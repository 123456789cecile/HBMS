
import React, { useEffect, useState } from "react";
import "./DoctorDashboard.css";



const API_URL = "http://localhost:5000/api";

function DoctorDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get appointments assigned to the logged-in doctor
  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/doctor/appointments`, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      });

      if (!response.ok) {
        throw new Error(
          response.status === 401 || response.status === 403
            ? "Please log in as a doctor to view appointments."
            : "Could not load appointments."
        );
      }

      const data = await response.json();

      setAppointments(Array.isArray(data) ? data : data.appointments || []);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/doctor/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update appointment status.");
      }

      await loadAppointments();
    } catch (err) {
      alert(err.message || "An error occurred.");
    }
  };

  const pendingCount = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedCount = appointments.filter(
    (item) => item.status === "Approved"
  ).length;

  const completedCount = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Appointments", icon: "▤" },
    { name: "Patients", icon: "♙" },
    { name: "My Profile", icon: "●" },
  ];

  const pageTitle =
    activePage === "Dashboard" ? "Doctor Dashboard" : activePage;

  const visibleAppointments =
    activePage === "Dashboard"
      ? appointments.slice(0, 5)
      : appointments;

  return (
    <div className="doctor-layout">
      <aside className="doctor-sidebar">
        <div className="doctor-brand">
          <div className="doctor-brand-icon">✚</div>
          <div>
            <h2>Kira Clinic</h2>
            <p>Doctor Portal</p>
          </div>
        </div>

        <p className="doctor-menu-label">MAIN MENU</p>

        <nav className="doctor-nav">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activePage === item.name
                  ? "doctor-nav-item active"
                  : "doctor-nav-item"
              }
              onClick={() => setActivePage(item.name)}
            >
              <span className="doctor-nav-icon">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <button
          className="doctor-logout"
          onClick={() => {
            window.location.href = "/UserLogin";
          }}
        >
          ⇥ Logout
        </button>
      </aside>

      <main className="doctor-main">
        <header className="doctor-topbar">
          <div>
            <p className="doctor-eyebrow">HOSPITAL MANAGEMENT SYSTEM</p>
            <h1>{pageTitle}</h1>
          </div>

          <div className="doctor-account">
            <div className="doctor-avatar">♙</div>
            <div>
              <strong>Doctor</strong>
              <p>Doctor Portal</p>
            </div>
          </div>
        </header>

        <section className="doctor-content">
          {activePage === "Dashboard" && (
            <>
              <div className="doctor-welcome">
                <div>
                  <p className="doctor-eyebrow">DOCTOR PORTAL</p>
                  <h2>Welcome to Your Dashboard</h2>
                  <p>
                    Manage appointments and review patient booking
                    information in one place.
                  </p>
                  <button
                    className="doctor-primary-button"
                    onClick={() => setActivePage("Appointments")}
                  >
                    View Appointments
                  </button>
                </div>
                <div className="doctor-welcome-icon">✚</div>
              </div>

              <div className="doctor-stats">
                <div className="doctor-stat-card">
                  <p>Total Appointments</p>
                  <h2>{appointments.length}</h2>
                </div>

                <div className="doctor-stat-card">
                  <p>Pending</p>
                  <h2>{pendingCount}</h2>
                </div>

                <div className="doctor-stat-card">
                  <p>Approved</p>
                  <h2>{approvedCount}</h2>
                </div>

                <div className="doctor-stat-card">
                  <p>Completed</p>
                  <h2>{completedCount}</h2>
                </div>
              </div>

              <AppointmentTable
                appointments={visibleAppointments}
                loading={loading}
                error={error}
                updateStatus={updateStatus}
                onRetry={loadAppointments}
              />
            </>
          )}

          {activePage === "Appointments" && (
            <AppointmentTable
              appointments={visibleAppointments}
              loading={loading}
              error={error}
              updateStatus={updateStatus}
              onRetry={loadAppointments}
            />
          )}

          {activePage === "Patients" && (
            <section className="doctor-panel">
              <h2>Patient Bookings</h2>
              <p>
                Patient information appears here through appointments
                assigned to your doctor account.
              </p>
              <AppointmentTable
                appointments={appointments}
                loading={loading}
                error={error}
                updateStatus={updateStatus}
                onRetry={loadAppointments}
              />
            </section>
          )}

          {activePage === "My Profile" && (
            <section className="doctor-panel">
              <h2>My Profile</h2>
              <p>
                Doctor profile details will be loaded from your account
                after the doctor authentication API is connected.
              </p>
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

function AppointmentTable({
  appointments,
  loading,
  error,
  updateStatus,
  onRetry,
}) {
  return (
    <section className="doctor-panel">
      <div className="doctor-panel-heading">
        <div>
          <h2>Patient Appointments</h2>
          <p>Review requests and update their status.</p>
        </div>

        <button className="doctor-refresh-button" onClick={onRetry}>
          ↻ Refresh
        </button>
      </div>

      {loading ? (
        <p className="doctor-message">Loading appointments...</p>
      ) : error ? (
        <div className="doctor-error">
          <p>{error}</p>
          <button onClick={onRetry}>Try Again</button>
        </div>
      ) : appointments.length === 0 ? (
        <p className="doctor-message">
          No appointments found. New patient bookings will appear here
          when the backend is connected.
        </p>
      ) : (
        <div className="doctor-table-wrapper">
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Medical Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => {
                const id =
                  appointment.appointment_id ?? appointment.id;

                return (
                  <tr key={id}>
                    <td>
                      {appointment.patient_name ||
                        appointment.full_name ||
                        "Patient"}
                    </td>
                    <td>
                      {appointment.specialty_name ||
                        appointment.specialty ||
                        "Not specified"}
                    </td>
                    <td>
                      {appointment.appointment_date
                        ? String(appointment.appointment_date).slice(0, 10)
                        : "—"}
                    </td>
                    <td>
                      {appointment.appointment_time || "—"}
                    </td>
                    <td>{appointment.reason || "—"}</td>
                    <td>
                      <span
                        className={`doctor-status ${
                          (appointment.status || "Pending").toLowerCase()
                        }`}
                      >
                        {appointment.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <select
                        className="doctor-status-select"
                        value={appointment.status || "Pending"}
                        onChange={(event) =>
                          updateStatus(id, event.target.value)
                        }
                        disabled={
                          !id ||
                          ["Completed", "Cancelled"].includes(
                            appointment.status
                          )
                        }
                        aria-label={`Update status for appointment ${id}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approve</option>
                        <option value="Rejected">Reject</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default DoctorDashboard;
