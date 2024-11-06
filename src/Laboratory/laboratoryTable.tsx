// src/components/LaboratoryTable.tsx
import React, { useEffect, useState } from "react";
import { fetchLaboratories } from "../services/laboratoryService";
import { Laboratory } from "../services/interface";
import "./style.css";
import { useNavigate } from "react-router-dom";

const LaboratoryTable: React.FC = () => {
  const navigate = useNavigate();
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);

  useEffect(() => {
    const loadLaboratories = async () => {
      const data = await fetchLaboratories();
      setLaboratories(data);
    };
    loadLaboratories();
  }, []);

  return (
    <div>
      <h1>Laboratory Listing</h1>
      <button
        onClick={() => {
          navigate("create");
        }}
      >
        Create New Laboratory
      </button>
      <table>
        <thead>
          <tr>
            <th>Laboratory Name</th>
            <th>City</th>
            <th>Cluster</th>
            <th>Available Equipment</th>
            <th>Fuel Oil Testing Parameters</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* {laboratories?.map((lab) => (
                        <LaboratoryRow key={lab.id} laboratory={lab} />
                    ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default LaboratoryTable;
