"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  FaExpandArrowsAlt,
  FaHeart,
  FaMinus,
  FaPlus,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRedditAlien,
  FaWhatsapp,
} from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import img1 from "../assets/image-1-13-450x450.png";
import ProductDetail from "../components/ProductDetail";
import RelatedProduct from "../components/RelatedProduct";
import { MdOutlineZoomOutMap } from "react-icons/md";
import SubNewsLatter from "../components/SubNewsLatter";
import SingleProductDiscription from "../components/SingleProductDiscription";

export default function Page() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(img1);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setBackgroundPosition(`${x}% ${y}%`);
    }
  };

  const thumbnails = [img1, img1, img1];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="max-w-7xl mx-auto px-2 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="relative">
          <span className="absolute left-4 top-4 bg-red-500 text-white text-sm font-bold rounded-full flex justify-center items-center h-[50px] w-[50px]">
            21%
          </span>
          <button
            className="absolute right-4 top-4 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="Expand image"
          >
            <MdOutlineZoomOutMap className="h-4 w-4" />
          </button>
          <div
      className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] overflow-hidden rounded-lg"
      onMouseMove={handleMouseMove}
    >
      {/* Main Image */}
      <Image
        ref={imageRef}
        src={selectedImage}
        alt="Huawei Watch GT 2 Pro"
        className="object-cover w-full h-full rounded-lg"
      />

      {/* Magnified Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg"
        style={{
          backgroundImage: `url(${selectedImage})`,
          backgroundSize: "200%", // Adjust zoom level (200% = 2x zoom)
          backgroundPosition: backgroundPosition,
        }}
      />
    </div>
          <div className="mt-4 flex gap-4">
            {thumbnails.map((thumb, idx) => (
              <Image
                key={idx}
                src={thumb}
                alt={`Thumbnail ${idx + 1}`}
                width={100}
                height={100}
                className="cursor-pointer rounded-md border hover:border-gray-400"
                onClick={() => setSelectedImage(thumb)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">
              Huawei Watch GT 2 Pro Titanium 47mm
            </h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <AiFillStar key={star} className="text-yellow-400 w-5 h-5" />
                ))}
                <AiOutlineStar className="text-gray-300 w-5 h-5" />
              </div>
              <span className="text-gray-400">3 reviews</span>
              <span className="">
                <span className="text-gray-400">Store:</span> groci
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-lg text-gray-500 line-through">₹99.99</span>
            <span className="text-3xl font-bold text-red-500">₹79.99</span>
          </div>

          <div className="inline-block rounded-md bg-green-100 px-3 py-1 text-sm text-green-600">
            In Stock
          </div>

          <p className="text-gray-500 text-sm">
            Fusce sapien urna, tristique non sapien nec, rutrum fringilla eros.
            Etiam accumsan odio eget tempus consectetur. Aliquam et sapien
            nulla. Suspendisse lobortis leo ante, imperdiet tristique magna
            tristique eu. Nullam ultrices vulputate odio, eu iaculis nulla
            congue quis.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-md border">
              <button
                className="px-3 py-3"
                onClick={decrementQuantity}
                aria-label="Decrease quantity"
              >
                <FaMinus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                className="px-3 py-3"
                onClick={incrementQuantity}
                aria-label="Increase quantity"
              >
                <FaPlus className="h-4 w-4" />
              </button>
            </div>
            <div>
              <button className="flex-1 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200">
                Add to cart
              </button>
            </div>
          </div>

          <button className="w-full py-2 px-4  transition duration-200 flex items-center justify-start">
            <FaHeart className="mr-2 h-4 w-4" />
            Add to wishlist
            <span className="ml-2 text-gray-400">
              33 people favorited this product
            </span>
          </button>

          <div className=" border-t border-gray-200 rounded-lg p-4 shadow-sm">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Delivered today (order
                Mon-Fri before 12:00, delivery between 17:00 and 22:00)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Including shipping
                costs, sent by klbtheme.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Pick up at a
                klbtheme.com collection point is possible
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> 30 days to change your
                mind and free returns
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Day and night customer
                service
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">SKU:</span> K1G7W3Q412
            </div>
            <div>
              <span className="font-semibold">Categories:</span>{" "}
              <span className="text-gray-500">Electronics, Watches</span>
            </div>
            <div>
              <span className="font-semibold">Tags:</span>{" "}
              <span className="text-gray-500">Huawei, watches</span>
            </div>
          </div>

          <div className="flex gap-2">
            {[
              FaFacebookF,
              FaTwitter,
              FaLinkedinIn,
              FaRedditAlien,
              FaWhatsapp,
            ].map((Icon, index) => (
              <button
                key={index}
                className="p-2 border border-gray-300 rounded-full hover:text-blue-700 hover:border-blue-700 transition duration-200"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <SingleProductDiscription handleview={handleOpenPopup} />
      <RelatedProduct handleview={handleOpenPopup} />
      <SubNewsLatter />

      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl rounded-lg shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleClosePopup}
            >
              <span className="text-2xl md:text-4xl font-bold">&times;</span>
            </button>

            <ProductDetail />
          </div>
        </div>
      )}
    </div>
  );
}
