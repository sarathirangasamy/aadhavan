import "./style.css";

import React, { useState } from "react";

import { Laboratory } from "../../services/interface";
import { createLaboratory } from "../../services/laboratoryService";
import { useNavigate } from "react-router-dom";

export const ModifyLaboratory: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [cluster, setCluster] = useState("");
  const [availableEquipment, setAvailableEquipment] = useState("");
  const [fuelOilTestingParameters, setFuelOilTestingParameters] = useState("");
  const [status, setStatus] = useState<"Live" | "Under Maintenance">("Live");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLaboratory: Laboratory = {
      id: Math.random().toString(),
      name,
      city,
      cluster,
      availableEquipment,
      fuelOilTestingParameters,
      status,
    };
    const result = await createLaboratory(newLaboratory);

    if (result) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Laboratory Name"
              required
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>

          <div className="form-group">
            <label>Cluster</label>
            <input
              value={cluster}
              onChange={(e) => setCluster(e.target.value)}
              placeholder="Cluster"
              required
            />
          </div>

          <div className="form-group">
            <label>Available Equipment</label>
            <input
              value={availableEquipment}
              onChange={(e) => setAvailableEquipment(e.target.value)}
              placeholder="Available Equipment"
              required
            />
          </div>

          <div className="form-group">
            <label>Fuel Oil Testing</label>
            <input
              value={fuelOilTestingParameters}
              onChange={(e) => setFuelOilTestingParameters(e.target.value)}
              placeholder="Fuel Oil Testing Parameters"
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Live" | "Under Maintenance")
              }
            >
              <option value="Live">Live</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>

          {/* Change to button element */}
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
          >
            Create Laboratory
          </button>
        </form>
      </div>
    </>
  );
};
