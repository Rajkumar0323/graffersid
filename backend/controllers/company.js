import Company from "../models/company.js";
import Review from "../models/review.js";

export async function addCompany(req, res) {
  try {
    const { companyName, location, foundedOn, city } = req.body;

    const logo = req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : null;

    const company = new Company({
      name: companyName,
      location,
      city,
      foundedOn,
      logo,
    });

    await company.save();

    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getCompanies(req, res) {
  try {
    const { filter = {} } = req.body;
    const { sort, search, city } = filter;

    const query = {};
    if (search) {
      query.name = { $regex: `^${search}`, $options: "i" };
    }
    if (city) {
      query.city = { $regex: `^${city}`, $options: "i" };
    }

    let companiesQuery = Company.find(query);

    if (sort) {
      switch (sort.toLowerCase()) {
        case "name":
          companiesQuery = companiesQuery.sort({ name: 1 });
          break;
        case "location":
          companiesQuery = companiesQuery.sort({ location: 1 });
          break;
        case "rating":
        case "average":
          companiesQuery = companiesQuery.sort({ averageRating: -1 });
          break;
        default:
          companiesQuery = companiesQuery.sort({ name: 1 });
      }
    }

    const companies = await companiesQuery.exec();
    res.json({ success: true, data: companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
export async function getAllCompanies(req, res) {
  try {
    const companies = await Company.find();
    res.json({ success: true, data: companies });
  } catch (error) {
    console.log("Error", error);
  }
}
export async function getLogo(req, res) {
  try {
    const company = await Company.findById(req.params.id);
    if (company && company.logo && company.logo.data) {
      res.set("Content-Type", company.logo.contentType);

      return res.send(company.logo.data);
    } else {
      res.status(404).send("Logo not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function getCompanyDetails(req, res) {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const reviews = await Review.find({ companyId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        company,
        reviews,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
