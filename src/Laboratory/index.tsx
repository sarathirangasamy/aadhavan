import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteLaboratory } from "../store/laboratorySlice";
import "./style.css";
import { useNavigate } from "react-router-dom";

const LaboratoryTable: React.FC = () => {
  const navigate = useNavigate();
  const laboratories = useSelector(
    (state: RootState) => state.laboratory.laboratories
  );

  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteLaboratory(id));
  };

  const goToEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

  return (
    <div>
      <h1>Laboratory Listing</h1>
      <button className="btn-align" onClick={() => navigate("/create")}>
        Create
      </button>
      <table>
        <thead>
          <tr>
            <th>Laboratory Name</th>
            <th>City</th>
            <th>Cluster</th>
            <th>Available Equipment</th>
            {/* <th>Fuel Oil Testing Parameters</th> */}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {laboratories?.length ? (
            laboratories.map((lab, index) => (
              <tr key={lab.id}>
                <td
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => {
                    goToEdit(lab.id);
                  }}
                >
                  {lab.name}
                </td>
                <td>{lab.city}</td>
                <td>{lab.cluster}</td>
                <td>{lab.availableEquipment}</td>
                {/* <td>{lab.fuelOilTestingParameters}</td> */}
                <td>{lab.status}</td>
                <td>
                  <button
                    onClick={() => {
                      goToEdit(lab.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(lab.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LaboratoryTable;
