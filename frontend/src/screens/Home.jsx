import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CustomDropdown from "../components/CustomDropdown";
import Navbar from "../components/Navbar";
import RenderStars from "../components/RenderStars";
import { Link, useLocation, useParams } from "react-router-dom";
import AddCompany from "../components/AddCompany";

const companies = [
  {
    id: 1,
    name: "Graffersid Web and App Development",
    address:
      "916, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)",
    rating: 4.5,
    reviews: 41,
    logo: "G",
    bgColor: "bg-dark",
    textColor: "text-white",
    founded: "01-01-2016",
  },
  {
    id: 2,
    name: "Code Tech Company",
    address: "414, Kanha Appartment, Bhawarkua, Indore (M.P.)",
    rating: 4.5,
    reviews: 0,
    logo: "<CT>",
    bgColor: "bg-success",
    textColor: "text-white",
    regDate: "01-01-2016",
  },
  {
    id: 3,
    name: "Innogent Pvt. Ltd.",
    address:
      "910, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)",
    rating: 4.5,
    reviews: 0,
    logo: "☀",
    bgColor: "bg-warning",
    textColor: "text-white",
    regDate: "01-01-2016",
  },
  {
    id: 4,
    name: "Pixel Web and App Development",
    address: "410, Bansi Trade Center, Indore (M.P.)",
    rating: 2.5,
    reviews: 0,
    logo: "P",
    bgColor: "bg-primary",
    textColor: "text-white",
    regDate: "01-01-2016",
  },
];

function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search");

  const [showAddCompany, setShowAddCompany] = useState(false);
  const [sortBy, setSortBy] = useState("Name");
  const options = ["Name", "Average", "Rating", "Location"];
  const [selectCity, setSelectCity] = useState("");
  const [companiesList, setCompaniesList] = useState([]);

  async function fetchCompanies() {
    let filter = {
      sort: sortBy,
      search: searchTerm ? searchTerm : "",
      city: selectCity.split(",")[0].trim(),
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/companies/filter`,
        { filter }
      );
      console.log("Companies list ----", response.data);
      if (response.status === 200) {
        setCompaniesList(response.data.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    fetchCompanies();
  }, []);
  useEffect(() => {
    fetchCompanies();
  }, [sortBy, searchTerm]);
  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear()}`;
  };
  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="container-fluid py-4" style={{ maxWidth: "1064px" }}>
        {/* Search Section */}
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div className="d-flex align-items-end w-100 flex-wrap justify-content-between">
            <div className="d-flex gap-2 me-4 align-items-end">
              <div>
                <label className="form-label fw-medium text-secondary mb-1">
                  Select City
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    value={selectCity}
                    onChange={(e) => setSelectCity(e.target.value)}
                    style={{ width: "280px", paddingRight: "40px" }}
                  />
                  <i className="bi bi-geo-alt-fill position-absolute top-50 end-0 translate-middle-y me-3 text-theme"></i>
                </div>
              </div>
              <button
                className="btn text-white fw-medium px-4 bg-theme"
                onClick={fetchCompanies}
              >
                Find Company
              </button>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn text-white fw-medium px-4 bg-theme"
                onClick={() => setShowAddCompany(true)}
              >
                + Add Company
              </button>
            </div>
            <div>
              <label className="form-label fw-medium text-secondary mb-1">
                Sort:
              </label>
              <CustomDropdown
                value={sortBy}
                onChange={setSortBy}
                options={options}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-3">
          <span className="text-muted">
            Result Found: {companiesList.length}
          </span>
        </div>

        {/* Company Listings */}
        <div className="row g-4">
          {companiesList.length > 0 &&
            companiesList.map((company) => (
              <div key={company._id} className="col-12">
                <div className="card border shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between">
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
                            src={`http://localhost:5000/api/companies/${company?._id}/logo`}
                            alt={`${company.name} Logo`}
                            style={{
                              width: "105px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                            className="rounded-1"
                          />
                        </div>

                        {/* Company Info */}
                        <div className="flex-grow-1">
                          <h5 className="card-title fw-semibold mb-1">
                            {company?.name}
                          </h5>
                          <div
                            className="d-flex align-items-center mb-3"
                            style={{ fontSize: "13px", color: "#767676" }}
                          >
                            <i className="bi bi-geo-alt me-1"></i>
                            <small>{company?.location}</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="fs-5 fw-semibold me-2">
                              {company?.averageRating}
                            </span>
                            <div className="d-flex me-3">
                              <RenderStars rating={company?.averageRating} />
                            </div>

                            <small className="text-muted">
                              {company?.reviewCount} Reviews
                            </small>
                          </div>
                        </div>
                      </div>

                      {/* Right Side Info */}
                      <div className="text-end">
                        <div
                          className="small mb-3"
                          style={{ fontSize: "13px", color: "#767676" }}
                        >
                          {company.foundedOn
                            ? `Founded on ${formatDate(company?.foundedOn)}`
                            : `Founded on N/A`}
                        </div>
                        <Link to={"/company/" + company._id}>
                          <button className="btn btn-dark px-4">
                            Detail Review
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <AddCompany
        show={showAddCompany}
        onClose={() => setShowAddCompany(false)}
        onSave={(data) => {
          console.log(data);
          setShowAddCompany(false);
        }}
      />
    </div>
  );
}

export default Home;
