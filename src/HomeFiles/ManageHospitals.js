
import React, { useEffect, useState } from "react";
import "./ManageHospitals.css";

const API_URL = "http://localhost:5000/api/hospitals";

const initialForm = {
  name: "",
  province: "",
  district: "",
  sector: "",
  address: "",
  latitude: "",
  longitude: "",
  phone: "",
};

function ManageHospitals() {
  const [form, setForm] = useState(initialForm);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadHospitals() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load hospitals.");
      }

      setHospitals(data);
    } catch (err) {
      setError("Ntibyashobotse kubona ibitaro. Reba ko backend ikora.");
    }
  }

  useEffect(() => {
    loadHospitals();
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      // Hindura izina rya key niba Admin login yawe
      // ibika token muri localStorage ikoresheje irindi zina.
      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error(
          "Banza winjire nka Admin kugira ngo wongere ibitaro."
        );
      }

      const payload = {
        ...form,
        latitude: form.latitude || null,
        longitude: form.longitude || null,
      };

      const response = await fetch(
        "http://localhost:5000/api/admin/hospitals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hospital was not added.");
      }

      setMessage("Ibitaro byongeweho neza!");
      setForm(initialForm);
      await loadHospitals();
    } catch (err) {
      setError(err.message || "Habaye ikibazo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="manage-hospitals">
      <h1>Manage Hospitals</h1>
      <p className="page-description">
        add and overview appoitment in the system.
      </p>

      <form className="hospital-form" onSubmit={handleSubmit}>
        <h2>Add New Hospital</h2>

        <label>Hospital Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Hospital name"
        />

        <label>Province / City *</label>
        <select
          name="province"
          value={form.province}
          onChange={handleChange}
          required
        >
          <option value="">Select province</option>
          <option value="City of Kigali">City of Kigali</option>
          <option value="Eastern Province">Eastern Province</option>
          <option value="Northern Province">Northern Province</option>
          <option value="Southern Province">Southern Province</option>
          <option value="Western Province">Western Province</option>
        </select>

        <label>District *</label>
        <input
          name="district"
          value={form.district}
          onChange={handleChange}
          required
          placeholder="e.g. Huye"
        />

        <label>Sector</label>
        <input
          name="sector"
          value={form.sector}
          onChange={handleChange}
          placeholder="Sector"
        />

        <label>Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Hospital address"
        />

        <div className="coordinate-fields">
          <div>
            <label>Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="-2.0000000"
            />
          </div>

          <div>
            <label>Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="29.0000000"
            />
          </div>
        </div>

        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Hospital phone number"
        />

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Hospital"}
        </button>
      </form>

      <section className="hospital-table-section">
        <h2>Registered Hospitals ({hospitals.length})</h2>

        {hospitals.length === 0 ? (
          <p>no any appoitment in database.</p>
        ) : (
          <div className="hospital-table-wrapper">
            <table className="hospital-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Province</th>
                  <th>District</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital) => (
                  <tr key={hospital.hospital_id}>
                    <td>{hospital.name}</td>
                    <td>{hospital.province}</td>
                    <td>{hospital.district}</td>
                    <td>{hospital.address || "Not provided"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default ManageHospitals;
