// src/components/LaboratoryRow.tsx
import React, { useState } from "react";
import { Laboratory } from "../services/interface";

interface LaboratoryRowProps {
  laboratory: Laboratory;
}

export const LaboratoryRow: React.FC<LaboratoryRowProps> = ({ laboratory }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fuelOilTestingParameters, setFuelOilTestingParameters] = useState(
    laboratory.fuelOilTestingParameters
  );

  const handleEdit = () => setIsEditing(!isEditing);

  const handleSave = () => {
    setIsEditing(false);
    laboratory.fuelOilTestingParameters = fuelOilTestingParameters;
  };

  return (
    <tr>
      <td
        onClick={() => {
          /* Navigate to LaboratoryDetails page */
        }}
      >
        {laboratory.name}
      </td>
      <td>{laboratory.city}</td>
      <td>{laboratory.cluster}</td>
      <td>{laboratory.availableEquipment}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={fuelOilTestingParameters}
            onChange={(e) => setFuelOilTestingParameters(e.target.value)}
          />
        ) : (
          fuelOilTestingParameters
        )}
        <button onClick={isEditing ? handleSave : handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </td>
      <td>{laboratory.status}</td>
    </tr>
  );
};
