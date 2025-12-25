import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/authPages/UserRegister";
import UserLogin from "../pages/authPages/UserLogin";
import FoodPartnerRegister from "../pages/authPages/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/authPages/FoodPartnerLogin";

import UserHomePage from "../pages/homePages/UserHomePage";
import FoodPartnerHomePage from "../pages/homePages/FoodPartnerHomePage";
import HomePage from "../pages/homePages/HomePage";
import { useEffect, useState } from "react";

const AppRoutes = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="relative min-h-screen w-full">
      {/* Theme Toggle Icon */}
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="absolute top-4 right-4 z-50 p-2 rounded-full dark:bg-[#11131e] hover:bg-gray-300 dark:hover:bg-[#282b35]"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#ffffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h1M3 12H2m16.485 4.485l-.707-.707M4.222 19.778l-.707-.707" />
            <circle cx="12" cy="12" r="5" fill="currentColor" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#030712]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        )}
      </button>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserHomePage />} />
          <Route path="/food-partner" element={<FoodPartnerHomePage />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route
            path="/food-partner/register"
            element={<FoodPartnerRegister />}
          />
          <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
