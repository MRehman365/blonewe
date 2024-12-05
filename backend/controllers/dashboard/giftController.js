const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const giftModel = require("../../models/giftModel");
const { responseReturn } = require("../../utiles/response");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

class giftController {
  add_gift = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 500, { error: err.message });
      }

      let {
        name,
        category,
        description,
        storageinfo,
        ingrediennts,
        stock,
        price,
        discount,
        shopName,
        brand,
        weight,
        unit,
        benefits, // Include benefits field
      } = fields;

      const { images } = files;
      // console.log("image", files);

      const videos = files.video
        ? Array.isArray(files.video)
          ? files.video
          : [files.video]
        : [];

      name = name.trim();
      const slug = name.split(" ").join("-");

      try {
        let allImageUrl = [];

        // Upload images
        if (images && images.length > 0) {
          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(
              images[i].filepath,
              {
                folder: "gifts/images",
              }
            );
            allImageUrl.push(result.url);
          }
        }

        // Upload videos to Cloudinary
        let allVideoUrl = [];
        if (videos && videos.length > 0) {
          for (let i = 0; i < videos.length; i++) {
            try {
              console.log(`Uploading video: ${videos[i].filepath}`); // Debug: Log file path
              const result = await cloudinary.uploader.upload(
                videos[i].filepath,
                {
                  folder: "gifts/videos",
                  resource_type: "video",
                }
              );
              allVideoUrl.push(result.url);
            } catch (uploadErr) {
              console.error(
                `Error uploading video ${videos[i].filepath}:`,
                uploadErr
              ); // Log specific upload error
            }
          }
        }

        // Create gift
        await giftModel.create({
          sellerId: id,
          name,
          slug,
          shopName,
          category: category,
          description: description,
          Shippingcharge: storageinfo,
          Shippingtime: ingrediennts,
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
          videos: allVideoUrl,
          brand: brand.trim(),
          weight: parseInt(weight), // Ensure weight is an integer
          unit: unit.trim(), // Ensure unit is a string
          points: benefits,
        });

        responseReturn(res, 201, { message: "gift added successfully" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  gifts_get = async (req, res) => {
    const { searchValue = "" } = req.query;
    const { id } = req;

    try {
      // Search criteria with sellerId and optional searchValue
      // const searchCriteria = {
      //   sellerId: id,
      //   ...(searchValue && { $text: { $search: searchValue } }),
      // };

      // Fetch all gifts matching the criteria
      const gifts = await giftModel.find({});

      responseReturn(res, 200, { gifts });
    } catch (error) {
      console.error("Error fetching gifts:", error.message);
      responseReturn(res, 500, { error: "Failed to fetch gifts" });
    }
  };

  gift_get = async (req, res) => {
    const { giftId } = req.params;
    try {
      const gift = await giftModel.findById(giftId);
      responseReturn(res, 200, { gift });
    } catch (error) {
      console.log(error.message);
    }
  };
  gift_update = async (req, res) => {
    let { name, description, discount, price, brand, giftId, stock } = req.body;
    name = name.trim();
    const slug = name.split(" ").join("-");
    try {
      await giftModel.findByIdAndUpdate(giftId, {
        name,
        description,
        discount,
        price,
        brand,
        giftId,
        stock,
        slug,
      });
      const gift = await giftModel.findById(giftId);
      responseReturn(res, 200, { gift, message: "gift update success" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  gift_image_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      const { giftId, oldImage } = field;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 404, { error: err.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
          });
          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "gifts",
          });

          if (result) {
            let { images } = await giftModel.findById(giftId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;

            await giftModel.findByIdAndUpdate(giftId, {
              images,
            });

            const gift = await giftModel.findById(giftId);
            responseReturn(res, 200, {
              gift,
              message: "gift image update success",
            });
          } else {
            responseReturn(res, 404, { error: "image upload failed" });
          }
        } catch (error) {
          responseReturn(res, 404, { error: error.message });
        }
      }
    });
  };
  delete_gift = async (req, res) => {
    const { id } = req.params; // Assume the gift ID is passed as a URL parameter

    try {
      // Find the gift by ID
      const gift = await giftModel.findById(id);

      if (!gift) {
        return responseReturn(res, 404, { error: "gift not found" });
      }

      // Delete images from Cloudinary
      if (gift.images && gift.images.length > 0) {
        for (let i = 0; i < gift.images.length; i++) {
          const publicId = gift.images[i].split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`gifts/images/${publicId}`);
        }
      }

      // Delete videos from Cloudinary
      if (gift.videos && gift.videos.length > 0) {
        for (let i = 0; i < gift.videos.length; i++) {
          const publicId = gift.videos[i].split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`gifts/videos/${publicId}`, {
            resource_type: "video",
          });
        }
      }

      // Delete the gift from the database
      await giftModel.findByIdAndDelete(id);

      responseReturn(res, 200, { message: "gift deleted successfully" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new giftController();
