import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site } from "../data/site.js";
import Icons from "./Icons.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/articles", label: "Articles" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/media", label: "Media" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  // Prevent body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-6 sm:h-[72px]">
        {/* Masthead */}
        <Link
          to="/"
          className="flex items-baseline gap-0.5 font-serif text-2xl font-bold tracking-tight text-ink-950"
          aria-label={`${site.name} — home`}
        >
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative py-2 text-sm font-medium transition-colors hover:text-ink-950 ${
                      isActive
                        ? "text-ink-950 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-accent"
                        : "text-ink-500"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-ink-200 text-ink-900 transition-colors hover:border-ink-950 lg:hidden"
        >
          {open ? <Icons.Close className="h-5 w-5" /> : <Icons.Menu className="h-5 w-5" />}
        </button>
      </div>

      </header>

      {/* Mobile menu — rendered outside <header> so the header's
          backdrop-blur cannot become its containing block */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-ink-100 bg-white sm:top-[72px] lg:hidden"
        >
          <ul className="container-x flex flex-col divide-y divide-ink-100">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-5 font-serif text-2xl font-semibold transition-colors ${
                      isActive ? "text-accent" : "text-ink-900 hover:text-accent"
                    }`
                  }
                >
                  {link.label}
                  <span aria-hidden="true" className="text-lg text-ink-300">
                    →
                  </span>
                </NavLink>
              </li>
            ))}
            <li className="py-8">
              <Link to="/contact" className="btn-primary w-full justify-center">
                Get in touch
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}