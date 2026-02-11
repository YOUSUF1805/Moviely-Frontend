import React from "react";
import logo from "../assets/images/Moviely_logo.png";
import {
  HiMagnifyingGlass,
  HiPlus,
  HiPlayCircle,
  HiTv,
} from "react-icons/hi2";
import HeaderList from "./HeaderList";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [isLoggedIn, setIsLoggedIn] = React.useState(
  localStorage.getItem("isLoggedIn") === "true"
);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const menu = [
    { name: "SEARCH", icon: HiMagnifyingGlass, path: "/search" },
    { name: "WATCHLIST", icon: HiPlus, path: "/watchlist" },
    { name: "MOVIES", icon: HiPlayCircle, path: "/movies" },
    { name: "SERIES", icon: HiTv, path: "/series" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between p-5">
      {/* LEFT */}
      <div className="flex items-center gap-8">
        <img src={logo} className="w-[80px] md:w-[115px]" />

        <div className="hidden md:flex gap-8">
          {menu.map((item, i) => (
            <Link key={i} to={item.path}>
              <HeaderList name={item.name} Icon={item.icon} />
            </Link>
          ))}
        </div>

        <div className="flex md:hidden gap-5">
          {menu.map((item, i) => (
            <Link key={i} to={item.path}>
              <HeaderList name="" Icon={item.icon} />
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div>
        {!isLoggedIn ? (
          <Link
            to="/login"
            className="border border-white px-4 py-1 rounded-lg text-white"
          >
            Login
          </Link>
        ) : (
         <div className="relative">
  {/* AVATAR */}
  <div
    onClick={() => setOpen(!open)}
    className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold cursor-pointer select-none"
  >
    {user?.name?.charAt(0)?.toUpperCase() || "U"}
  </div>

  {/* DROPDOWN */}
  {open && (
    <div className="absolute right-0 mt-2 bg-black text-white rounded-lg shadow-lg w-32 z-50">
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-lg"
      >
        Logout
      </button>
    </div>
  )}
</div>

        )}
      </div>
    </div>
  );
};

export default Header;
