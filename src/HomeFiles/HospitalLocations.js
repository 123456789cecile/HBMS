
import React, { useEffect, useState } from "react";
import "./HospitalLocations.css";

const API_URL = "http://localhost:5000/api/hospitals";

function HospitalLocations() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Could not load hospitals.");
        }

        setHospitals(data);
      } catch (err) {
        setError(
          "Ntibyashobotse kubona ibitaro. Ongera ugerageze nyuma."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals.filter((hospital) =>
    [
      hospital.name,
      hospital.province,
      hospital.district,
      hospital.sector,
      hospital.address,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function getMapUrl(hospital) {
    const hasCoordinates =
      hospital.latitude !== null &&
      hospital.latitude !== undefined &&
      hospital.longitude !== null &&
      hospital.longitude !== undefined;

    const destination = hasCoordinates
      ? `${hospital.latitude},${hospital.longitude}`
      : [
          hospital.name,
          hospital.district,
          hospital.province,
          "Rwanda",
        ]
          .filter(Boolean)
          .join(", ");

    return `https://www.google.com/maps?q=${encodeURIComponent(
      destination
    )}&output=embed`;
  }

  function getDirectionsUrl(hospital) {
    const hasCoordinates =
      hospital.latitude !== null &&
      hospital.latitude !== undefined &&
      hospital.longitude !== null &&
      hospital.longitude !== undefined;

    const destination = hasCoordinates
      ? `${hospital.latitude},${hospital.longitude}`
      : [
          hospital.name,
          hospital.district,
          hospital.province,
          "Rwanda",
        ]
          .filter(Boolean)
          .join(", ");

    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      destination
    )}`;
  }

  return (
    <div className="locations-page">
      <header className="locations-header">
        <h1>Hospitals Across Rwanda</h1>
        <p>
          Shaka ibitaro, urebe aho biherereye, ubone n'inzira
          ibugezayo.
        </p>
      </header>

      <input
        className="hospital-search"
        type="search"
        placeholder="Search hospital, province or district..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {loading && <p>Loading hospitals...</p>}
      {error && <p className="locations-error">{error}</p>}

      {!loading && !error && (
        <>
          <section className="locations-map">
            <h2>
              {selectedHospital
                ? selectedHospital.name
                : "Map of Rwanda Hospitals"}
            </h2>

            <iframe
              title="Google Maps hospital location"
              src={
                selectedHospital
                  ? getMapUrl(selectedHospital)
                  : "https://www.google.com/maps?q=Hospitals+in+Rwanda&output=embed"
              }
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>

          <section className="hospital-list">
            <h2>
              Available Hospitals ({filteredHospitals.length})
            </h2>

            {filteredHospitals.length === 0 ? (
              <p>
                
                no any appoitment meet to what you want.
              </p>
            ) : (
              filteredHospitals.map((hospital) => (
                <article
                  className="hospital-card"
                  key={hospital.hospital_id}
                >
                  <h3>{hospital.name}</h3>

                  <p>
                    <strong>Province:</strong>{" "}
                    {hospital.province}
                  </p>

                  <p>
                    <strong>District:</strong>{" "}
                    {hospital.district}
                  </p>

                  {hospital.sector && (
                    <p>
                      <strong>Sector:</strong>{" "}
                      {hospital.sector}
                    </p>
                  )}

                  {hospital.address && (
                    <p>
                      <strong>Address:</strong>{" "}
                      {hospital.address}
                    </p>
                  )}

                  {hospital.phone && (
                    <p>
                      <strong>Phone:</strong>{" "}
                      {hospital.phone}
                    </p>
                  )}

                  <div className="hospital-actions">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedHospital(hospital)
                      }
                    >
                      View on Map
                    </button>

                    <a
                      href={getDirectionsUrl(hospital)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Directions
                    </a>
                  </div>
                </article>
              ))
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default HospitalLocations;
