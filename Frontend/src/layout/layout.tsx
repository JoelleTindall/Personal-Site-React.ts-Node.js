import React, { type ReactNode } from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./layout.css";

interface Props {
  children: ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const nav = document.getElementById("stickynav");
    const navHeight = nav?.clientHeight || 0;

    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    // set scrollMarginTop -1 so no overlap..
    sections.forEach((section) => {
      section.style.scrollMarginTop = `${navHeight - 1}px`;
    });

    // scroll to hash target if present
    const scrollToHash = () => {
      if (location.hash) {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/NotFound");
        }
      }
    };

    // timeout allowing child components to render
    const timeoutId = setTimeout(() => {
      scrollToHash();
    }, 100);

    // scroll listener to update URL based on position
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - navHeight;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          // update the URL hash without scrolling
          window.history.replaceState(null, "", `#${section.id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location, navigate]);

  return (
    <>
      <NavBar />
      <div className="row">
        <div className="column left sidebar"></div>
        <div className="column middle content">
          {children}
          <Footer />
        </div>
        <div className="column right sidebar"></div>
      </div>
    </>
  );
};

export default Layout;
