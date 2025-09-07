import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RenderStars from "../components/RenderStars";
import ReviewCard from "../components/ReviewCard";
import AddReview from "../components/AddReview";
import { useParams } from "react-router-dom";
import axios from "axios";

// Mock data for the company and reviews
const companyData = {
  id: 4,
  name: "Pixel Web and App Development",
  address: "410, Bansi Trade Center, Indore (M.P.)",
  rating: 2.5,
  reviews: 0,
  logo: "P",
  bgColor: "bg-primary",
  textColor: "text-white",
  regDate: "01-01-2016",
};

const reviewsData = [
  {
    id: 1,
    name: "Jorgue Watson",
    date: "01-01-2022, 14:33",
    rating: 4,
    avatar: "https://picsum.photos/id/1/300/300",
    review:
      "Graffersid one of the best Company dolor sit amet, consectetur adipiscing elit. Congue netus feugiat elit suspendisse commodo. Pellentesque risus suspendisse mattis et massa. Ultrices ac at nibh et. Aliquam aliquam ultrices ac pulvinar eleifend duis. Eget congue fringilla quam ut mattis tortor posuere semper ac. Sem egestas vestibulum faucibus montes. Gravida sit non arcu consequat.",
  },
  {
    id: 2,
    name: "Jenny kole",
    date: "12-01-2022, 15:00",
    rating: 4,
    avatar: "https://picsum.photos/id/2/300/300",
    review:
      "Graffersid one of the best Company dolor sit amet, consectetur adipiscing elit. Congue netus feugiat elit suspendisse commodo. Pellentesque risus suspendisse mattis et massa. Ultrices ac at nibh et.",
  },
  {
    id: 3,
    name: "Ayush Patel",
    date: "12-01-2022, 15:00",
    rating: 4,
    avatar: "https://picsum.photos/id/3/300/300",
    review: "Graffersid one of the best Company in App Development",
  },
  {
    id: 4,
    name: "Ayush Patel",
    date: "12-01-2022, 15:00",
    rating: 4,
    avatar: "https://picsum.photos/id/3/300/300",
    review: "Graffersid one of the best Company in App Development",
  },
  {
    id: 6,
    name: "Ayush Patel",
    date: "12-01-2022, 15:00",
    rating: 4,
    avatar: "https://picsum.photos/id/3/300/300",
    review: "Graffersid one of the best Company in App Development",
  },
  {
    id: 5,
    name: "Ayush Patel",
    date: "12-01-2022, 15:00",
    rating: 4,
    avatar: "https://picsum.photos/id/3/300/300",
    review: "Graffersid one of the best Company in App Development",
  },
];

export default function CompanyDetailPage() {
  const [showAddReview, setShowAddReview] = useState(false);
  const { companyId } = useParams();
  const [company, setCompany] = useState();
  //   const companyId = params.id;
  async function getCompanyDetails(id) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/company/${id}`
      );
      console.log("detail---->>>>", response.data);
      if (response.status === 200) {
        setCompany(response.data.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    getCompanyDetails(companyId);
  }, []);
  useEffect(() => {
    console.log("data---", company?.reviews);
  }, [company]);
  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear()}`;
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div
        className="container-fluid py-4"
        style={{ maxWidth: "1064px", marginTop: "50px" }}
      >
        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 rounded-2">
          <div className="card border shadow-sm">
            <div className="card-body p-4 bg-white">
              <div className="d-flex flex-column flex-md-row justify-content-between">
                <div className="d-flex">
                  {/* Company Logo */}
                  <div
                    //   className={`rounded d-flex align-items-center justify-content-center me-4 ${companies[0].bgColor} ${companies[0].textColor} fw-bold`}
                    className={`rounded d-flex align-items-center justify-content-center me-4 fw-bold`}
                    //   style={{
                    //     width: "80px",
                    //     height: "80px",
                    //     fontSize: "20px",
                    //     flexShrink: 0,
                    //   }}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}/api/companies/${
                        company?.company?._id
                      }/logo`}
                      alt={`${company?.company?.name} Logo`}
                      style={{
                        width: "105px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      className="rounded-1"
                    />
                  </div>

                  {/* companyData Info */}
                  <div className="flex-grow-1">
                    <h5 className="card-title fw-semibold mb-2">
                      {company?.company?.name}
                    </h5>
                    <div className="d-flex align-items-center text-muted mb-3">
                      <i className="bi bi-geo-alt me-1"></i>
                      <small>{company?.company?.location}</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fs-5 fw-semibold me-2">
                        {company?.company?.averageRating}
                      </span>
                      <div className="d-flex me-3">
                        <RenderStars rating={company?.company?.averageRating} />
                      </div>

                      <small className="text-muted">
                        {company?.company?.reviewCount} Reviews
                      </small>
                    </div>
                  </div>
                </div>

                {/* Right Side Info */}
                <div className="text-end">
                  <div className="small text-muted mb-3">
                    {company?.company?.foundedOn &&
                      `Founded on ${formatDate(company?.company?.foundedOn)}`}
                  </div>
                  <button
                    className="btn text-white fw-medium px-4 bg-theme"
                    onClick={() => setShowAddReview(true)}
                  >
                    + Add Review
                  </button>
                </div>
              </div>
            </div>
            {/* Reviews Section */}
            <div
              className="space-y-6 mx-4"
              style={{ borderTop: "1px solid lightgray", paddingTop: "20px" }}
            >
              <p style={{ fontSize: "13px", color: "#A0A0A0" }}>
                Result Found: {company?.reviews.length}
              </p>
              {company?.reviews.length > 0 &&
                company?.reviews.map((review) => (
                  <ReviewCard
                    avatar={review.avatar}
                    date={review?.createdAt}
                    name={review?.fullName}
                    rating={review?.rating}
                    review={review?.reviewText}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <AddReview
        show={showAddReview}
        onClose={() => setShowAddReview(false)}
        onSave={(data) => {
          setShowAddReview(false);
          getCompanyDetails(companyId);
        }}
        companyId={companyId}
      />
    </div>
  );
}
