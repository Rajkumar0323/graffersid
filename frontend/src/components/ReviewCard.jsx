import RenderStars from "./RenderStars";

// ReviewCard Component
function ReviewCard({ name, date, rating, avatar, review }) {
  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear()}`;
  };
  return (
    <div className="card border-0 mb-3">
      <div className="card-body p-1 p-md-4">
        <div className="d-flex flex-column flex-md-row align-items-start">
          {/* Avatar */}
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-4 fw-bold"
            style={{
              width: "40px",
              height: "40px",
              fontSize: "18px",
              backgroundColor: "#6c757d", // Example color, you can vary dynamically
              color: "white",
              flexShrink: 0,
            }}
          >
            {name?.[0]?.toUpperCase()}
          </div>

          {/* Content */}
          <div className="flex-grow-1">
            {/* Header with name, date, and stars */}
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6
                  className="fw-semibold text-dark"
                  style={{ fontSize: "18px" }}
                >
                  {name}
                </h6>
                <small className="text-muted" style={{ fontSize: "13px" }}>
                  {formatDate(date)}
                </small>
              </div>
              <div className="d-flex">
                <RenderStars rating={rating} />
              </div>
            </div>

            {/* Review Text */}
            <p
              className="mb-0"
              style={{ fontSize: "14px", lineHeight: "1", color: "#494949" }}
            >
              {review}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
