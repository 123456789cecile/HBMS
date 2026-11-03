
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import ManageHospitals from "./ManageHospitals";

const initialPatients = [
  {
    id: 1,
    name: "Patient One",
    email: "patient1@example.com",
    phone: "0780000001",
  },
  {
    id: 2,
    name: "Patient Two",
    email: "patient2@example.com",
    phone: "0780000002",
  },
];

const initialDoctors = [
  {
    id: 1,
    specialty: "General Medicine",
    phone: "0781000001",
  },
  {
    id: 2,
    specialty: "Pediatrics",
    phone: "0781000002",
  },
];

const initialAppointments = [
  {
    id: 1,
    patient: "Patient One",
    specialty: "General Medicine",
    date: "2026-10-25",
    time: "09:00",
    status: "Pending",
  },
];

const menuItems = [
  "Dashboard",
  "Manage Patients",
  "Manage Doctors",
  "Appointments",
  "Hospital Locations",
  "Reports",
  "Settings",
];

function AdminDashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("Dashboard");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const [patients, setPatients] = useState(initialPatients);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);

  const [patientForm, setPatientForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [doctorForm, setDoctorForm] = useState({
    specialty: "",
    phone: "",
  });

  const [clinicSettings, setClinicSettings] = useState({
    name: "Kira Clinic",
    email: "kiraclinic064@gmail.com",
    phone: "0781123456",
    address: "Nyagatare, Rwanda",
  });

  const showPage = (page) => {
    setActivePage(page);
    setMessage("");
    setSearch("");
  };

  const addPatient = (event) => {
    event.preventDefault();

    const newPatient = {
      id: Date.now(),
      ...patientForm,
    };

    setPatients((previous) => [...previous, newPatient]);
    setPatientForm({ name: "", email: "", phone: "" });
    setMessage("Patient added successfully!");
  };

  const removePatient = (id) => {
    if (window.confirm("Do you want to remove this patient?")) {
      setPatients((previous) =>
        previous.filter((patient) => patient.id !== id)
      );
      setMessage("Patient removed successfully.");
    }
  };

  const addDoctor = (event) => {
    event.preventDefault();

    const newDoctor = {
      id: Date.now(),
      ...doctorForm,
    };

    setDoctors((previous) => [...previous, newDoctor]);
    setDoctorForm({ specialty: "", phone: "" });
    setMessage("Medical specialty added successfully!");
  };

  const removeDoctor = (id) => {
    if (window.confirm("Do you want to remove this specialty?")) {
      setDoctors((previous) =>
        previous.filter((doctor) => doctor.id !== id)
      );
      setMessage("Specialty removed successfully.");
    }
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment
      )
    );

    setMessage("Appointment status updated.");
  };

  const saveSettings = (event) => {
    event.preventDefault();
    setMessage("Clinic settings updated for this session.");
  };

  const handleLogout = () => {
    navigate("/AdminLogin");
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.email} ${patient.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.specialty} ${doctor.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const renderDashboard = () => (
    <>
      <section className="admin-welcome">
        <div>
          <p className="admin-eyebrow">ADMINISTRATION PORTAL</p>
          <h1>Welcome, Administrator!</h1>
          <p>Manage your hospital from one place.</p>
        </div>
        <div className="admin-welcome-icon">✚</div>
      </section>

      <section className="admin-stat-grid">
        <StatCard
          icon="♙"
          label="Total Patients"
          value={patients.length}
          color="blue"
        />

        <StatCard
          icon="✚"
          label="Medical Specialties"
          value={doctors.length}
          color="green"
        />

        <StatCard
          icon="▤"
          label="Appointments"
          value={appointments.length}
          color="orange"
        />

        <StatCard
          icon="◷"
          label="Pending Requests"
          value={
            appointments.filter(
              (appointment) => appointment.status === "Pending"
            ).length
          }
          color="purple"
        />
      </section>

      <section className="admin-panel">
        <h2>Recent Appointments</h2>

        <AppointmentTable
          appointments={appointments.slice(0, 5)}
          onStatusChange={updateAppointmentStatus}
        />

        <p className="admin-demo-note">
          These are sample records stored in React state.
        </p>
      </section>
    </>
  );

  const renderPatients = () => (
    <>
      <section className="admin-panel">
        <h2>Add New Patient</h2>

        <form className="admin-form" onSubmit={addPatient}>
          <label>Full Name</label>
          <input
            required
            value={patientForm.name}
            onChange={(event) =>
              setPatientForm({
                ...patientForm,
                name: event.target.value,
              })
            }
            placeholder="Enter patient name"
          />

          <label>Email</label>
          <input
            type="email"
            required
            value={patientForm.email}
            onChange={(event) =>
              setPatientForm({
                ...patientForm,
                email: event.target.value,
              })
            }
            placeholder="patient@example.com"
          />

          <label>Phone Number</label>
          <input
            required
            value={patientForm.phone}
            onChange={(event) =>
              setPatientForm({
                ...patientForm,
                phone: event.target.value,
              })
            }
            placeholder="Enter phone number"
          />

          <button className="admin-primary-button" type="submit">
            Add Patient
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <h2>Patient List</h2>

        <SearchBox value={search} onChange={setSearch} />

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>
                    <button
                      className="admin-delete-button"
                      onClick={() => removePatient(patient.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="4">No patients found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );

  const renderDoctors = () => (
    <>
      <section className="admin-panel">
        <h2>Add Medical Specialty</h2>

        <p className="admin-description">
          Patients will see specialties, not doctors' names.
        </p>

        <form className="admin-form" onSubmit={addDoctor}>
          <label>Medical Specialty</label>
          <input
            required
            value={doctorForm.specialty}
            onChange={(event) =>
              setDoctorForm({
                ...doctorForm,
                specialty: event.target.value,
              })
            }
            placeholder="e.g. Pediatrics"
          />

          <label>Contact Phone</label>
          <input
            required
            value={doctorForm.phone}
            onChange={(event) =>
              setDoctorForm({
                ...doctorForm,
                phone: event.target.value,
              })
            }
            placeholder="Enter contact phone"
          />

          <button className="admin-primary-button" type="submit">
            Add Specialty
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <h2>Available Medical Specialties</h2>

        <div className="admin-location-grid">
          {filteredDoctors.map((doctor) => (
            <article
              className="admin-location-card"
              key={doctor.id}
            >
              <div className="admin-stat-icon green">✚</div>
              <h3>{doctor.specialty}</h3>
              <p>Contact: {doctor.phone}</p>

              <button
                className="admin-delete-button"
                onClick={() => removeDoctor(doctor.id)}
              >
                Remove
              </button>
            </article>
          ))}

          {filteredDoctors.length === 0 && (
            <p>No medical specialties found.</p>
          )}
        </div>
      </section>
    </>
  );

  const renderAppointments = () => (
    <section className="admin-panel">
      <h2>Manage Appointments</h2>

      <AppointmentTable
        appointments={appointments}
        onStatusChange={updateAppointmentStatus}
      />
    </section>
  );

  const renderReports = () => (
    <>
      <section className="admin-stat-grid">
        <StatCard
          icon="♙"
          label="Registered Patients"
          value={patients.length}
          color="blue"
        />

        <StatCard
          icon="✚"
          label="Medical Specialties"
          value={doctors.length}
          color="green"
        />

        <StatCard
          icon="▤"
          label="All Appointments"
          value={appointments.length}
          color="orange"
        />

        <StatCard
          icon="✓"
          label="Completed Appointments"
          value={
            appointments.filter(
              (appointment) => appointment.status === "Completed"
            ).length
          }
          color="purple"
        />
      </section>

      <section className="admin-panel">
        <h2>Appointment Summary</h2>

        {["Pending", "Confirmed", "Completed", "Cancelled"].map(
          (status) => {
            const count = appointments.filter(
              (appointment) => appointment.status === status
            ).length;

            const percentage = appointments.length
              ? (count / appointments.length) * 100
              : 0;

            return (
              <div className="report-row" key={status}>
                <span>{status}</span>

                <div className="report-bar">
                  <div
                    className="report-bar-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <strong>{count}</strong>
              </div>
            );
          }
        )}
      </section>
    </>
  );

  const renderSettings = () => (
    <section className="admin-panel">
      <h2>Clinic Settings</h2>

      <form className="admin-form" onSubmit={saveSettings}>
        <label>Clinic Name</label>
        <input
          required
          value={clinicSettings.name}
          onChange={(event) =>
            setClinicSettings({
              ...clinicSettings,
              name: event.target.value,
            })
          }
        />

        <label>Email Address</label>
        <input
          type="email"
          required
          value={clinicSettings.email}
          onChange={(event) =>
            setClinicSettings({
              ...clinicSettings,
              email: event.target.value,
            })
          }
        />

        <label>Phone Number</label>
        <input
          required
          value={clinicSettings.phone}
          onChange={(event) =>
            setClinicSettings({
              ...clinicSettings,
              phone: event.target.value,
            })
          }
        />

        <label>Address</label>
        <input
          required
          value={clinicSettings.address}
          onChange={(event) =>
            setClinicSettings({
              ...clinicSettings,
              address: event.target.value,
            })
          }
        />

        <button className="admin-primary-button" type="submit">
          Save Settings
        </button>
      </form>

      <p className="admin-demo-note">
        These settings are stored in React state for this demo only.
      </p>
    </section>
  );

  // Hospital Locations now uses ManageHospitals.
  const renderPage = () => {
    switch (activePage) {
      case "Manage Patients":
        return renderPatients();

      case "Manage Doctors":
        return renderDoctors();

      case "Appointments":
        return renderAppointments();

      case "Hospital Locations":
        return <ManageHospitals />;

      case "Reports":
        return renderReports();

      case "Settings":
        return renderSettings();

      default:
        return renderDashboard();
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo">✚</div>

          <div>
            <h2>Kira Clinic</h2>
            <span>Management System</span>
          </div>
        </div>

        <p className="admin-menu-label">MAIN MENU</p>

        <nav
          className="admin-menu"
          aria-label="Admin navigation"
        >
          {menuItems.map((item) => (
            <button
              type="button"
              key={item}
              className={`admin-menu-link ${
                activePage === item ? "selected" : ""
              }`}
              onClick={() => showPage(item)}
            >
              <span className="admin-menu-icon">
                {item === "Dashboard" && "▦"}
                {item === "Manage Patients" && "♙"}
                {item === "Manage Doctors" && "✚"}
                {item === "Appointments" && "▤"}
                {item === "Hospital Locations" && "⌖"}
                {item === "Reports" && "▥"}
                {item === "Settings" && "⚙"}
              </span>

              <span>{item}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="admin-menu-link admin-logout"
          onClick={handleLogout}
        >
          <span className="admin-menu-icon">⇥</span>
          <span>Logout</span>
          <span className="logout-arrow">→</span>
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>HOSPITAL MANAGEMENT SYSTEM</p>
            <h2>{activePage}</h2>
          </div>

          <div className="admin-user">
            <div className="admin-user-avatar">A</div>

            <div>
              <strong>Administrator</strong>
              <span>System Manager</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {message && (
            <div className="admin-message" role="status">
              {message}

              <button
                type="button"
                onClick={() => setMessage("")}
                aria-label="Dismiss message"
              >
                ×
              </button>
            </div>
          )}

          {renderPage()}
        </div>

        <footer className="admin-footer">
          © {new Date().getFullYear()} Kira Clinic · Admin Portal
        </footer>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <article className="admin-stat-card">
      <div className={`admin-stat-icon ${color}`}>{icon}</div>
      <p>{label}</p>
      <h2>{value}</h2>
      <span>Current demo count</span>
    </article>
  );
}

function SearchBox({ value, onChange }) {
  return (
    <input
      className="admin-search"
      type="search"
      placeholder="Search by name, email, specialty or phone..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Search records"
    />
  );
}

function AppointmentTable({ appointments, onStatusChange }) {
  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Medical Specialty</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patient}</td>
              <td>{appointment.specialty}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>
                <select
                  className="admin-status-select"
                  value={appointment.status}
                  onChange={(event) =>
                    onStatusChange(
                      appointment.id,
                      event.target.value
                    )
                  }
                  aria-label={`Status for appointment ${appointment.id}`}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </td>
            </tr>
          ))}

          {appointments.length === 0 && (
            <tr>
              <td colSpan="5">No appointments available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
