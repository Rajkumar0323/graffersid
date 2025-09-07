import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
const AddReview = ({ show, onClose, onSave, companyId }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
  });
  const [formError, setFormError] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [show]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  async function handleAddReview(data) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reviews`,
        data
      );
    } catch (error) {
      console.log("Error", error);
    }
  }
  const handleSave = () => {
    if (!formData.fullName || !formData.reviewText || !formData.subject) {
      setFormError("All the fields are mandatory");
      return;
    }
    setFormError("");
    let data = { ...formData, rating, companyId: companyId };
    handleAddReview(data);
    setFormData({ fullName: "", subject: "", reviewText: "" });
    setRating(0);
    onSave();
  };

  const getRatingText = (stars) => {
    const ratingTexts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Satisfied",
      5: "Excellent",
    };
    return ratingTexts[stars] || "";
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{
          zIndex: 1050,
          opacity: isAnimating ? 1 : 0,
          transition: "opacity 0.25s ease-in-out",
        }}
        onClick={onClose}
      ></div>

      <div
        className="position-fixed top-50 start-50 translate-middle bg-white rounded-4 shadow-lg modal-content"
        style={{
          zIndex: 1051,
          width: "400px",
          maxHeight: "90vh",
          overflow: "auto",
          opacity: isAnimating ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isAnimating ? 1 : 0.95})`,
          transition: "opacity 0.25s ease-in-out, transform 0.25s ease-in-out",
        }}
      >
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

        <button
          className="btn-close position-absolute top-0 end-0 m-3 fw-bold"
          onClick={onClose}
          style={{ zIndex: 10, fontSize: "12px" }}
        ></button>

        <div className="p-4 pt-5 mt-4" style={{ paddingTop: "3rem" }}>
          <h4 className="fw-bold text-center mb-4 text-dark">Add Review</h4>

          <div className="mb-3">
            <label className="form-label text-muted mb-2">Full Name</label>
            <input
              type="text"
              className="form-control border-secondary-subtle"
              placeholder="Enter"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              style={{
                border: "1px solid #CDCDCD",
                padding: "5px 16px",
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted mb-2">Subject</label>
            <input
              type="text"
              className="form-control border-secondary-subtle"
              placeholder="Enter"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              style={{
                border: "1px solid #CDCDCD",
                padding: "5px 16px",
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted mb-2">
              Enter your Review
            </label>
            <textarea
              type="text"
              className="form-control border-secondary-subtle"
              placeholder="Discription"
              value={formData.reviewText}
              rows={4}
              onChange={(e) => handleInputChange("reviewText", e.target.value)}
              style={{
                border: "1px solid #CDCDCD",
                padding: "5px 16px",
                resize: "none",
              }}
            />
          </div>

          <div className="mb-4">
            <h5 className="fw-bold text-dark mb-1">Rating</h5>
            <div className="d-flex align-items-center justify-content-between gap-2">
              <div className="d-flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="btn p-0 border-0 bg-transparent"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    style={{ fontSize: "30px", lineHeight: 1 }}
                  >
                    <i
                      className={`bi ${
                        star <= (hoveredRating || rating)
                          ? "bi-star-fill text-warning"
                          : "bi-star-fill"
                      }`}
                      style={{
                        color:
                          star <= (hoveredRating || rating) ? "" : "#D9D9D9",
                      }}
                    ></i>
                  </button>
                ))}
              </div>
              {(rating > 0 || hoveredRating > 0) && (
                <span className="text-muted ms-2" style={{ fontSize: "12px" }}>
                  {getRatingText(hoveredRating || rating)}
                </span>
              )}
            </div>
          </div>

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
};

export default AddReview;
