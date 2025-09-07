import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CustomDropdown = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="btn btn-light border d-flex justify-content-between align-items-center fw-semibold text-dark"
        type="button"
        style={{
          width: "150px",
          minWidth: "fit-content",
          borderRadius: "0.5rem",
          borderBottomLeftRadius: open ? "0px" : "0.5rem",
          borderBottomRightRadius: open ? "0px" : "0.5rem",
        }}
        onClick={toggleDropdown}
      >
        {value}
        <i
          className="bi bi-chevron-down ms-2"
          style={{ fontSize: "0.8rem" }}
        ></i>
      </button>

      {open && (
        <ul
          className="dropdown-menu show shadow-sm border"
          style={{
            position: "absolute",
            zIndex: 1000,
            width: "150px",
            minWidth: "fit-content",
            borderRadius: "0.5rem",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
          }}
        >
          {options.map((option) => (
            <li key={option}>
              <button
                className={`dropdown-item ${
                  option === value ? "fw-semibold text-dark" : "text-muted"
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
