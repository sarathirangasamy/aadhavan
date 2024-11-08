import React, { useEffect, useState } from "react";
import { Laboratory } from "../../services/interface";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addLaboratory, updateLaboratory } from "../../store/laboratorySlice";
import "./style.css";
import { RootState } from "../../store/store";

export const ModifyLaboratory: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    cluster: "",
    availableEquipment: [] as string[],
    fuelOilTestingParameters: {
      viscosity: "",
      sulfurContent: "",
      waterContent: "",
      flashPoint: "",
    },
    status: "Live" as "Live" | "Under Maintenance",
  });

  const laboratories = useSelector(
    (state: RootState) => state.laboratory.laboratories
  );

  useEffect(() => {
    if (id && laboratories.length) {
      const lab = laboratories.find((lab) => lab.id === id);
      if (lab) {
        setFormData({
          name: lab.name,
          city: lab.city,
          cluster: lab.cluster,
          availableEquipment: lab.availableEquipment,
          fuelOilTestingParameters: lab.fuelOilTestingParameters,
          status: lab.status,
        });
      }
    }
  }, [id, laboratories]);

  // Validation states
  const [errors, setErrors] = useState({
    name: "",
    city: "",
    cluster: "",
    availableEquipment: "",
    viscosity: "",
    sulfurContent: "",
    waterContent: "",
    flashPoint: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      city: "",
      cluster: "",
      availableEquipment: "",
      viscosity: "",
      sulfurContent: "",
      waterContent: "",
      flashPoint: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!formData.cluster.trim()) {
      newErrors.cluster = "Cluster is required";
      isValid = false;
    }
    if (formData.availableEquipment.length === 0) {
      newErrors.availableEquipment = "Available Equipment is required";
      isValid = false;
    }
    if (!formData.fuelOilTestingParameters.viscosity.trim()) {
      newErrors.viscosity = "Viscosity is required";
      isValid = false;
    }
    if (!formData.fuelOilTestingParameters.sulfurContent.trim()) {
      newErrors.sulfurContent = "Sulfur content is required";
      isValid = false;
    }
    if (!formData.fuelOilTestingParameters.waterContent.trim()) {
      newErrors.waterContent = "Water content is required";
      isValid = false;
    }
    if (!formData.fuelOilTestingParameters.flashPoint.trim()) {
      newErrors.flashPoint = "Flash point is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("fuelOilTestingParameters.")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        fuelOilTestingParameters: {
          ...prevData.fuelOilTestingParameters,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const laboratory: Laboratory = {
        id: id || Math.random().toString(),
        ...formData,
      };

      if (id) {
        dispatch(updateLaboratory(laboratory));
      } else {
        dispatch(addLaboratory(laboratory));
      }

      navigate("/");
    }
  };

  const goToList = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container-bg">
        <h3 className="text-title">{id ? "Update" : "Create"} Laboratory</h3>
        <div className="container">
          <form onSubmit={handleSubmit}>
            {/* First Row (Name, City, Cluster) */}
            <div className="row">
              <div className="form-group column">
                <label>Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Laboratory Name"
                  required
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              <div className="form-group column">
                <label>City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
                {errors.city && (
                  <span className="error-message">{errors.city}</span>
                )}
              </div>

              <div className="form-group column">
                <label>Cluster</label>
                <input
                  name="cluster"
                  value={formData.cluster}
                  onChange={handleChange}
                  placeholder="Cluster"
                  required
                />
                {errors.cluster && (
                  <span className="error-message">{errors.cluster}</span>
                )}
              </div>
            </div>

            {/* Second Row (Available Equipment) */}
            <div className="row">
              <div className="form-group column">
                <label>Available Equipment (comma-separated)</label>
                <input
                  name="availableEquipment"
                  value={formData.availableEquipment.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availableEquipment: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    })
                  }
                  placeholder="Available Equipment"
                  required
                />
                {errors.availableEquipment && (
                  <span className="error-message">
                    {errors.availableEquipment}
                  </span>
                )}
              </div>

              <div className="form-group column">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Live">Live</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>
            </div>

            {/* Third Row (Fuel Oil Testing Parameters) */}
            <div className="row">
              {["viscosity", "sulfurContent", "waterContent", "flashPoint"].map(
                (param) => (
                  <div className="form-group column" key={param}>
                    <label>
                      {param.charAt(0).toUpperCase() + param.slice(1)}
                    </label>
                    <input
                      name={`fuelOilTestingParameters.${param}`}
                      value={(formData.fuelOilTestingParameters as any)[param]}
                      onChange={handleChange}
                      placeholder={
                        param.charAt(0).toUpperCase() + param.slice(1)
                      }
                      required
                    />
                    {errors[param as keyof typeof errors] && (
                      <span className="error-message">
                        {errors[param as keyof typeof errors]}
                      </span>
                    )}
                  </div>
                )
              )}
            </div>



            <button type="submit" className="submit-button">
              {id ? "Update" : "Submit"}
            </button>
            <button type="button" className="cancel-button" onClick={goToList}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
