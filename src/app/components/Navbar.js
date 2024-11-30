"use client";

import React, { useState, useEffect } from "react";
import { BsBoxSeam, BsChevronDown } from "react-icons/bs";
import {
  IoCarSportOutline,
  IoStorefrontOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { BsMoon } from "react-icons/bs";
import { useTheme } from "../layout";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo-marketplace-light.png";
import logo2 from "../assets/logo-marketplace-light.webp";
import { FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
import { TbArmchair, TbMoodKid } from "react-icons/tb";
import { ImMobile2 } from "react-icons/im";
import { PiDress } from "react-icons/pi";
import { CiDiscount1 } from "react-icons/ci";
import { MdMenu, MdOutlineMenu, MdOutlineSportsTennis } from "react-icons/md";
import { GiCrystalEarrings, GiLipstick } from "react-icons/gi";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: <ImMobile2 className="h-5 w-5" />,
  },
  { id: "fashion", name: "Fashion", icon: <PiDress className="h-5 w-5" /> },
  {
    id: "furniture",
    name: "Furniture",
    icon: <TbArmchair className="h-5 w-5" />,
  },
  {
    id: "auto-parts",
    name: "Auto Parts",
    icon: <IoCarSportOutline className="h-5 w-5" />,
  },
  {
    id: "grocery",
    name: "Grocery",
    icon: <IoStorefrontOutline className="h-5 w-5" />,
  },
  {
    id: "cosmetic",
    name: "Cosmetic",
    icon: <GiLipstick className="h-5 w-5" />,
  },
  { id: "kids", name: "Kids", icon: <TbMoodKid className="h-5 w-5" /> },
  {
    id: "jewellery",
    name: "Jewellery",
    icon: <GiCrystalEarrings className="h-5 w-5" />,
  },
  {
    id: "sports",
    name: "Sports",
    icon: <MdOutlineSportsTennis className="h-5 w-5" />,
  },
  { id: "sport1", name: "Discount Goods" },
  { id: "sport2", name: "We Recommended" },
  { id: "sport3", name: "New Product" },
  { id: "sport4", name: "Best Selling" },
];
const Navbar = () => {
  const initialTime = 1 * 24 * 60 * 60 + 14 * 60 * 60 + 20 * 60 + 10;
  const [isOpen, setIsOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [openNavbar, setOpenNav] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeRemaining / (24 * 60 * 60));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="">
      <div className="bg-[#004798] hidden md:block">
        <p className="text-center p-2 text-[15px] text-white hidden md:block">
          <span className="font-[600]">FREE delivery & 40% Discount</span> for
          next 3 orders! Place your 1st order in.
          <span className="bg-[#4075b2] px-2 py-1 text-base rounded-md ml-4">
            {days} <span className="text-gray-400 text-[12px]">d</span>
          </span>
          <span className="bg-[#4075b2] px-2 py-1 text-base rounded-md ml-1">
            {hours} <span className="text-gray-400 text-[12px]">h</span>
          </span>
          <span className="bg-[#4075b2] px-2 py-1 text-base rounded-md ml-1">
            {minutes} <span className="text-gray-400 text-[12px]">m</span>
          </span>
          <span className="ml-1 text-gray-400">:</span>
          <span className="bg-[#4075b2] px-2 py-1 text-base rounded-md ml-1">
            {seconds} <span className="text-gray-400 text-[12px]">s</span>
          </span>
        </p>
        <div className="border-b border-[#ffffff4b] px-2">
          <div className="hidden md:flex justify-between w-full text-white py-2  max-w-7xl mx-auto">
            <div className="text-sm flex gap-4 items-center">
              <Link href="/tracking" className="flex items-center gap-1">
                <span>
                  <BsBoxSeam />
                </span>
                Track Record
              </Link>
              <Link href="/about">About us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/myaccount">Vendor Dashboard</Link>
            </div>
            <div className="text-sm flex gap-4 items-center">
              <p>English</p>
              <p>INR</p>
              <button
                onClick={toggleTheme} // Toggle the theme on button click
                className="flex items-center gap-1 p-2 bg-[#4075b2] rounded-md text-white"
              >
                {theme === "light" ? (
                  <IoSunnyOutline className="text-xl" /> // Light theme icon
                ) : (
                  <BsMoon className="text-xl" /> // Dark theme icon
                )}
                {theme === "light" ? "Light Theme" : "Dark Theme"}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-primary text-white p-4 max-w-7xl mx-auto">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image
                src={logo}
                alt="Blonwe Logo "
                className="max-w-[200px] h-auto"
              />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-4xl mx-0 md:mx-8 w-full mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full bg-white text-black focus:ring-1 focus:ring-primary outline-none pl-4 pr-10 py-2 rounded-md"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Account Actions */}
            <div className="flex items-center space-x-6">
              <Link href="/myaccount" className="flex flex-col items-center">
                <FaRegCircleUser className="h-6 w-6 mb-1" />
                <span className="text-[13px]">My Account</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex flex-col items-center relative"
              >
                <FaRegHeart className="h-6 w-6 mb-1" />
                <span className="text-[13px]">Wishlist</span>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Link>
              <Link
                href="/mycart"
                className="flex flex-col items-center relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-[13px]">My Cart</span>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border-b bg-bgInput hidden md:block">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between py-4">
            <div className="flex flex-wrap items-center space-x-4 md:space-x-8">
              {/*  */}
              <div className="w-[330px] relative hidden md:block">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center justify-between text-gray-500 w-full px-4 py-2 text-left  border border-gray-300 rounded-t-[8px] focus:outline-none focus:ring-none "
                  aria-expanded={isOpen}
                >
                  <MdOutlineMenu className="h-5 w-5 transition-transform duration-200" />
                  <span className="font-medium ">Browse Categories</span>
                  <BsChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-[50px] w-full z-50 bg-[white] rounded-b-[8px] bg-blur-[10px] left-0  border border-gray-300 overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <nav className="py-2  relative text-gray-500">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.id}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#004798] hover:text-white transition-colors text-[14px]"
                      >
                        <span className="text-primary">{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              {/*  */}
              <Link href="/" className="text-gray-500 hover:text-[#003B95]">
                Home
              </Link>

              <div className="relative group">
                <a
                  href="#"
                  className="flex items-center text-gray-500 hover:text-[#003B95]"
                >
                  Shop
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
                <div className="absolute z-10 hidden group-hover:block bg-white border rounded-md mt-2 py-2 w-48">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-500 hover:bg-gray-100"
                  >
                    New Arrivals
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-500 hover:bg-gray-100"
                  >
                    Best Sellers
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-500 hover:bg-gray-100"
                  >
                    Sale Items
                  </a>
                </div>
              </div>

              <a
                href="/furniture"
                className="flex items-center text-gray-500 hover:text-[#003B95]"
              >
                <span className="mr-2">
                  <TbArmchair />
                </span>{" "}
                Furniture
              </a>

              <a
                href="/electronics"
                className="flex items-center text-gray-500 hover:text-[#003B95]"
              >
                <span className="mr-2">
                  <ImMobile2 />
                </span>{" "}
                Electronics
              </a>

              <a
                href="/fashion"
                className="flex items-center text-gray-500 hover:text-[#003B95]"
              >
                <span className="mr-2">
                  <PiDress />
                </span>{" "}
                Fashion
              </a>

              <a href="/blog" className="text-gray-500 hover:text-[#003B95]">
                Blog
              </a>

              <div className="relative group">
                <a
                  href="#"
                  className="flex items-center text-gray-500 hover:text-[#003B95]"
                >
                  <span className="mr-2">
                    <CiDiscount1 />
                  </span>{" "}
                  Best Discounts
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
                <div className="absolute z-10 hidden group-hover:block bg-white border rounded-md mt-2 py-2 w-48">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Daily Deals
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Clearance
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Season Special
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View Navbar */}
      <div>
        <div className="flex justify-between items-center text-white p-2 px-4 md:hidden bg-primary fixed top-0 w-full z-[99]">
          <div>
            <MdOutlineMenu className="h-6 w-6"  onClick={() => setOpenNav(!openNavbar)} />
          </div>
          <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image src={logo} alt="Blonwe Logo" className="w-[100px] h-auto" />
          </Link>
          <Link href="/mycart" className="flex flex-col items-center relative">
            <FiShoppingBag className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Link>
        </div>

        {openNavbar && (
          <div   className={`w-[80%] fixed md:sticky min-h-[100vh] top-0 z-[100] ${
            openNavbar ? "left-0" : "-left-[100%]"
          } bg-white md:bg-[#ffffff04]  z-50 p-2 transition-all duration-300`}>
            <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image src={logo2} alt="Blonwe Logo" className="w-[100px] h-auto" />
          </Link>
          <div>
          <IoMdClose />
          </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
