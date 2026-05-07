"use client";
import { Headerdata } from "@/lib/data/pageData";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Logo from "./logo";
import HeaderLink from "./navigation/HeaderLink";
import MobileHeaderLink from "./navigation/MobileHeaderLink";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const mobileMenuRef = useRef(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 10);
  };

  const handleClickOutside = (event) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen]);

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navbarOpen]);

  const handleSignOut = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        sticky ? "shadow-lg bg-body-bg bg-banner-image py-4" : "shadow-none py-6"
      }`}
    >
      <div>
        <div className="container flex items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex grow items-center gap-8 justify-center ml-14">
            {Headerdata.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className="flex items-center gap-4">
            
            <div className="hidden lg:flex items-center gap-4">
              <span className="text-gray-300 font-medium">
                {user?.email || 'User'}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-linear-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white duration-300 px-6 py-2 rounded-lg text-sm font-semibold shadow-md shadow-red-500/20"
              >
                Sign Out
              </button>
            </div>

            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
            </button>
          </div>
        </div>

        {navbarOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40" />
        )}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold text-midnight_text">
              <Logo />
            </h2>
            <button
              onClick={() => setNavbarOpen(false)}
              className="hover:cursor-pointer"
              aria-label="Close menu Modal"
            >
              <Icon
                icon="tabler:currency-xrp"
                className="text-white text-xl hover:text-primary text-24 inline-block me-2"
              />
            </button>
          </div>
          <nav className="flex flex-col items-start p-4 text-white">
            {Headerdata.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className="mt-8 flex flex-col space-y-4 w-full border-t border-white/10 pt-4">
              <span className="text-gray-400 text-sm">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;