"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

function AddCompany({ show, onClose, onSave }) {
  const [formData, setFormData] = useState({
    companyName: "",
    logo: null,
    location: "",
    foundedOn: "",
    city: "",
  });
  const [formError, setFormError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  async function addCompany() {
    const data = new FormData();
    data.append("companyName", formData.companyName);
    data.append("logo", formData.logo);
    data.append("location", formData.location);
    data.append("foundedOn", formData.foundedOn);
    data.append("city", formData.city);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/companies`,
        data
      );
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData((prev) => ({ ...prev, logo: files[0] })); // Store File object
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (
      !formData.companyName ||
      !formData.logo ||
      !formData.location ||
      !formData.foundedOn ||
      !formData.city
    ) {
      setFormError("All the fields are required!!!");
      return;
    }
    setFormError("");
    addCompany();
    onSave(formData);
    setFormData({
      companyName: "",
      location: "",
      foundedOn: "",
      city: "",
      logo: null,
    });
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{
          zIndex: 1050,
          opacity: isVisible ? 0.5 : 0,
          transition: "opacity 0.25s ease-in-out",
        }}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="position-fixed top-50 start-50 translate-middle bg-white rounded-4 shadow-lg modal-content"
        style={{
          zIndex: 1051,
          width: "400px",
          maxHeight: "90vh",
          overflow: "auto",
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.95})`,
          transition: "opacity 0.25s ease-in-out, transform 0.25s ease-in-out",
        }}
      >
        {/* Decorative circles */}
        <div
          className="position-absolute"
          style={{ top: 0, left: 0, zIndex: -1 }}
        >
          <div
            className="rounded-circle bg-theme"
            style={{
              width: "120px",
              height: "120px",
              transform: "translate(-40px, -8px)",
            }}
          ></div>
          <div
            className="rounded-circle position-absolute bg-theme"
            style={{
              width: "100px",
              height: "100px",
              opacity: "25%",
              top: "-45px",
              left: "45px",
              zIndex: -1,
            }}
          ></div>
        </div>

        {/* Close button */}
        <button
          className="btn-close position-absolute top-0 end-0 m-3 fw-bold"
          onClick={onClose}
          style={{ zIndex: 10, fontSize: "12px" }}
        ></button>

        {/* Content */}
        <div className="p-4 pt-5 mt-4" style={{ paddingTop: "3rem" }}>
          {/* Title */}
          <h4 className="fw-bold text-center mb-4 text-dark">Add Company</h4>

          {/* Form */}
          <div className="mb-2">
            <label className="form-label text-muted mb-2">Company name</label>
            <input
              type="text"
              className="form-control border-secondary-subtle"
              placeholder="Enter..."
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              style={{
                border: "1px solid #CDCDCD",
                padding: "5px 16px",
              }}
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-muted mb-2">Logo</label>
            <input
              type="file"
              className="form-control border-secondary-subtle"
              placeholder="Enter..."
              name="logo"
              accept="image/*"
              //   value={formData.logo}
              onChange={handleChange}
              style={{
                border: "1px solid #CDCDCD",
                padding: "5px 16px",
              }}
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-muted mb-2">Location</label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control border-secondary-subtle"
                placeholder="Select Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={{
                  border: "1px solid #CDCDCD",
                  padding: "5px 16px",
                  paddingRight: "40px",
                }}
              />
              <i className="bi bi-geo-alt position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label text-muted mb-2">Founded on</label>
            <div className="position-relative">
              <input
                type="date"
                className="form-control border-secondary-subtle"
                placeholder="DD/MM/YYYY"
                value={formData.foundedOn}
                name="foundedOn"
                onChange={handleChange}
                style={{
                  border: "1px solid #CDCDCD",
                  padding: "5px 16px",
                  paddingRight: "40px",
                }}
              />
              <i className="bi bi-calendar3 position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted mb-2">City</label>
            <input
              type="text"
              className="form-control border-secondary-subtle"
              value={formData.city}
              name="city"
              onChange={handleChange}
              style={{
                border: "1px solid #CDCDCD",
                padding: "5px 16px",
              }}
            />
          </div>

          {/* Save Button */}
          {formError && <small className="text-danger">{formError}</small>}
          <div className="text-center">
            <button
              className="btn text-white px-5 py-2 fw-semibold bg-theme"
              onClick={handleSave}
              style={{
                backgroundColor: "#8b5cf6",
                borderColor: "#8b5cf6",
                borderRadius: "8px",
                minWidth: "120px",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCompany;
