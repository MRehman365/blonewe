"use client";

import React, { useState, useEffect } from 'react';
import { BsBoxSeam } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { BsMoon } from "react-icons/bs"; 
import { useTheme } from "../layout";
import Link from 'next/link';

const Navbar = () => {
  const initialTime = 1 * 24 * 60 * 60 + 14 * 60 * 60 + 20 * 60 + 10;

  const [timeRemaining, setTimeRemaining] = useState(initialTime);
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
    <div className="bg-[#004798]">
      <p className="text-center p-2 text-[15px] text-white">
        <span className="font-[600]">FREE delivery & 40% Discount</span> for next 3 orders! Place your 1st order in.
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
      <div className='hidden md:flex justify-between w-full text-white px-10 py-2 border-b'>
        <div className='text-sm flex gap-4 items-center'>
            <Link href='/tracking' className='flex items-center gap-1'><span><BsBoxSeam /></span>Track Record</Link>
            <Link href='/about'>About us</Link>
            <Link href='/contact'>Contact</Link>
            <p>Vendor Dashboard</p>
        </div>
        <div className='text-sm flex gap-4 items-center'>
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
  );
};

export default Navbar;
