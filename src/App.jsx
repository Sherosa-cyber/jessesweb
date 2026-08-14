import { useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Media from "./pages/Media.jsx";
import NotFound from "./pages/NotFound.jsx";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Restores a deep-link path saved by public/404.html (GitHub Pages SPA fallback).
function SpaFallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const saved = sessionStorage.getItem("gh-spa-path");
    if (saved) {
      sessionStorage.removeItem("gh-spa-path");
      navigate(saved, { replace: true });
    }
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <>
      <SpaFallback />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:slug" element={<ArticleDetail />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="media" element={<Media />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
