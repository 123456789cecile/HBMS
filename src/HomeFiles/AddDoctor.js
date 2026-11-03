
import React, { useState } from "react";
import './AddDoctor.css';
const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  license_number: "",
  qualification: "",
  years_of_experience: "0",
  hospital_id: "",
  password: "",
};

export default function AddDoctor() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const token = sessionStorage.getItem("hmsAdminToken");

    if (!token) {
      setMessage("Please log in as admin first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/doctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            years_of_experience: Number(form.years_of_experience),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add doctor.");
      }

      setMessage(
        `Success! ${data.doctor.full_name} was added. Email: ${data.doctor.email}`
      );

      setForm(initialForm);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-doctor-page">
      <div className="add-doctor-card">
        <h2>Add New Doctor</h2>
        <p>Create a doctor account for the hospital.</p>

        {message && (
          <div className="add-doctor-message" role="status">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Doctor's Full Name</label>
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label>License Number</label>
          <input
            name="license_number"
            value={form.license_number}
            onChange={handleChange}
            required
          />

          <label>Qualification</label>
          <input
            name="qualification"
            placeholder="e.g. General Practitioner"
            value={form.qualification}
            onChange={handleChange}
            required
          />

          <label>Years of Experience</label>
          <input
            type="number"
            name="years_of_experience"
            min="0"
            step="1"
            value={form.years_of_experience}
            onChange={handleChange}
            required
          />

          <label>Hospital ID (optional)</label>
          <input
            type="number"
            name="hospital_id"
            min="1"
            value={form.hospital_id}
            onChange={handleChange}
            placeholder="Enter an existing hospital ID"
          />

          <label>Temporary Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            minLength="8"
            autoComplete="new-password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding Doctor..." : "Add Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
}
