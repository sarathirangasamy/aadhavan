import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteLaboratory } from '../store/laboratorySlice';
import './style.css'
import { useNavigate } from 'react-router-dom';
const LaboratoryTable: React.FC = () => {
  const navigate = useNavigate()
    const laboratories = useSelector((state: RootState) => state.laboratory.laboratories);
    const dispatch = useDispatch();

  console.log(laboratories,'laboratories')

    const handleDelete = (id: string) => {
        dispatch(deleteLaboratory(id));
    };

    return (
        <div>
            <h1>Laboratory Listing</h1>
            <button onClick={() => navigate('/create')}>Create New Laboratory</button>
            <table>
                <thead>
                    <tr>
                        <th>Laboratory Name</th>
                        <th>City</th>
                        <th>Cluster</th>
                        <th>Available Equipment</th>
                        <th>Fuel Oil Testing Parameters</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {laboratories.map((lab) => (
                        <tr key={lab.id}>
                            <td>{lab.name}</td>
                            <td>{lab.city}</td>
                            <td>{lab.cluster}</td>
                            <td>{lab.availableEquipment}</td>
                            <td>{lab.fuelOilTestingParameters}</td>
                            <td>{lab.status}</td>
                            <td>
                                <button onClick={() => {/* Implement edit logic */}}>Edit</button>
                                <button onClick={() => handleDelete(lab.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LaboratoryTable;
