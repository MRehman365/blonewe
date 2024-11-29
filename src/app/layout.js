"use client";

import React, { createContext, useState, useContext } from "react";
import localFont from "next/font/local";
import "./globals.css"; // Ensure this file contains global styles
import Navbar from "./components/Navbar"; // Adjust path if necessary
import Footer from "./components/Footer";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <html lang="en">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
          style={{
            backgroundColor: theme === "light" ? "#fff" : "#1a202c", // Dynamic background color
            color: theme === "light" ? "#000" : "#fff", // Dynamic text color
          }}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </ThemeContext.Provider>
    </html>
  );
}
