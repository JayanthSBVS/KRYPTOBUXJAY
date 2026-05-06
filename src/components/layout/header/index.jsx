import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Headerdata } from "@/lib/data/pageData";
import { useAuthModalStore } from "@/store/useAuthModalStore";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./logo";
import HeaderLink from "./navigation/HeaderLink";
import MobileHeaderLink from "./navigation/MobileHeaderLink";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const { openLogin, openRegister } = useAuthModalStore();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 10);
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && navbarOpen) {
        setNavbarOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen]);

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? "hidden" : "";
  }, [navbarOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        sticky ? "shadow-lg bg-body-bg py-4" : "shadow-none py-6"
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

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="hidden lg:flex items-center gap-2 text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
                >
                  <Icon icon="tabler:layout-dashboard" className="text-lg" />
                  Dashboard
                </button>
                <div className="hidden lg:flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-white">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer"
                    title="Sign out"
                  >
                    <Icon icon="tabler:logout" className="text-lg" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Sign In — Ghost */}
                <button
                  onClick={() => openLogin()}
                  className="hidden lg:block border border-primary text-primary hover:bg-primary/10 transition-all duration-200 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
                >
                  Sign In
                </button>

                {/* Start Earning — Solid */}
                <button
                  onClick={() => openRegister("")}
                  className="hidden lg:block text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer shadow-lg shadow-primary/20"
                >
                  Start Earning
                </button>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white mt-1.5" />
              <span className="block w-6 h-0.5 bg-white mt-1.5" />
            </button>
          </div>
        </div>

        {/* Mobile overlay */}
        {navbarOpen && <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40" />}

        {/* Mobile drawer */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Logo />
            <button onClick={() => setNavbarOpen(false)} className="hover:cursor-pointer" aria-label="Close menu">
              <Icon icon="tabler:x" className="text-white text-2xl hover:text-primary" />
            </button>
          </div>
          <nav className="flex flex-col items-start p-4 text-white">
            {Headerdata.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className="mt-4 flex flex-col space-y-3 w-full">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => { navigate("/dashboard"); setNavbarOpen(false); }}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => { handleLogout(); setNavbarOpen(false); }}
                    className="w-full border border-white/20 text-white/60 px-4 py-3 rounded-lg text-sm cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { openLogin(); setNavbarOpen(false); }}
                    className="w-full border border-primary text-primary px-4 py-3 rounded-lg hover:bg-primary/10 text-sm font-medium cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { openRegister(""); setNavbarOpen(false); }}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-lg text-sm font-semibold cursor-pointer"
                  >
                    Start Earning Free
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;