import express from "express";
import {
  addCompany,
  getAllCompanies,
  getCompanies,
  getCompanyDetails,
  getLogo,
} from "../controllers/company.js";
import { addReview, getCompanyReviews } from "../controllers/review.js";
import { upload } from "../middlewares/multerConfig.js";
const router = express.Router();

// Company
router.post("/companies", upload.single("logo"), addCompany);
router.post("/companies/filter", getCompanies);
router.get("/companies/all", getAllCompanies);
router.get("/company/:companyId", getCompanyDetails);
router.get("/companies/:id/logo", getLogo);
// Review
router.post("/reviews", addReview);
router.get("/reviews/:companyId", getCompanyReviews);

export default router;
