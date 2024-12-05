const Banner = require("../../models/bannerModel");
const { responseReturn } = require("../../utiles/response");
const cloudinary = require("cloudinary").v2; // Make sure Cloudinary is configured

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

class uploadBanner {
  add_banner = async (req, res) => {
    try {
      const { category } = req.body;
      const file = req.file; // Access uploaded file from multer

      //   console.log("object", file);

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "banners",
      });

      // Create banner entry in the database
      await Banner.create({
        category,
        url: result.secure_url, // Use Cloudinary's secure URL
      });

      res.status(201).json({ message: "Banner added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  get_banner = async (req, res) => {
    try {
      const bannerData = await Banner.find({});
      responseReturn(res, 200, { bannerData });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  banner_delete = async (req, res) => {
    const { id } = req.params;
    console.log("banner-delete", id);
    try {
      const bannerData = await Banner.findByIdAndDelete(id);
      if (!bannerData) {
        return responseReturn(res, 404, { error: "Banner not found" });
      }
      responseReturn(res, 200, { message: "Banner deleted successfully" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new uploadBanner();

// Upload Banner Controller
// exports.uploadBanner = async (req, res) => {
//   const { category } = req.body;
//   const files = req.files; // Assuming files are uploaded as an array

//   if (!files || files.length === 0) {
//     return res.status(400).json({ error: "No files uploaded" });
//   }

//   try {
//     // Upload each file to Cloudinary
//     const uploadPromises = files.map((file) =>
//       cloudinary.uploader.upload(file.path)
//     );

//     const results = await Promise.all(uploadPromises);

//     // Save banners to the database
//     const bannerData = results.map((result) => ({
//       url: result.secure_url,
//       category,
//     }));

//     const banners = await Banner.insertMany(bannerData);
//     res.status(200).json({ message: "Banners uploaded successfully", banners });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to upload banners", details: error });
//   }
// };

// // Get Banners Controller
// exports.getBanners = async (req, res) => {
//   const { category } = req.query; // Optional category filter

//   try {
//     const query = category ? { category } : {};
//     const banners = await Banner.find(query).sort({ createdAt: -1 });
//     res.status(200).json(banners);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve banners" });
//   }
// };

// // Delete Banner Controller
// exports.deleteBanner = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const banner = await Banner.findById(id);
//     if (!banner) {
//       return res.status(404).json({ error: "Banner not found" });
//     }

//     // Delete from Cloudinary
//     const publicId = banner.url.split("/").pop().split(".")[0];
//     await cloudinary.uploader.destroy(publicId);

//     // Delete from database
//     await Banner.findByIdAndDelete(id);
//     res.status(200).json({ message: "Banner deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete banner" });
//   }
// };
