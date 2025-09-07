import RenderStars from "./RenderStars";

function ReviewCard({ name, date, rating, avatar, review }) {
  const formatDate = (isoDate) => {
    const d = new Date(isoDate);

    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  };
  return (
    <div className="card border-0 mb-3">
      <div className="card-body p-1 p-md-4">
        <div className="d-flex flex-column flex-md-row align-items-start">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-4 fw-bold"
            style={{
              width: "40px",
              height: "40px",
              fontSize: "18px",
              backgroundColor: "#6c757d",
              color: "white",
              flexShrink: 0,
            }}
          >
            {name?.[0]?.toUpperCase()}
          </div>

          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6
                  className="fw-semibold text-dark m-0"
                  style={{ fontSize: "18px" }}
                >
                  {name}
                </h6>
                <small
                  className="mt-2"
                  style={{ fontSize: "13px", color: "#969696" }}
                >
                  {formatDate(date)}
                </small>
              </div>
              <div className="d-flex">
                <RenderStars rating={rating} />
              </div>
            </div>

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
