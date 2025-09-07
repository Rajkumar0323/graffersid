import Company from "../models/company.js";
import Review from "../models/review.js";

export async function addReview(req, res) {
  try {
    const { companyId, fullName, subject, reviewText, rating } = req.body;

    const review = new Review({
      companyId,
      fullName,
      subject,
      reviewText,
      rating,
    });
    await review.save();

    const stats = await Review.aggregate([
      { $match: { companyId: review.companyId } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    await Company.findByIdAndUpdate(review.companyId, {
      averageRating: stats[0]?.avgRating || 0,
      reviewCount: stats[0]?.count || 0,
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getCompanyReviews(req, res) {
  try {
    const { companyId } = req.params;
    const reviews = await Review.find({ companyId }).sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
