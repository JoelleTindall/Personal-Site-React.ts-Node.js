import React, { useEffect, useState } from "react";
import "./hamburger.css";
interface Props {
  children: React.ReactNode;
}

const Hamburger: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
const [height, setHeight] = useState(0);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

    useEffect(() => {
    const navBar = document.getElementById("stickynav");
    if (navBar) {
      setHeight(navBar.clientHeight);
    }
  }, []);

  return (
    <div className="hamburger-menu">
      <button className="hamburger-icon" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "open" : ""}`} />
        <div className={`bar ${isOpen ? "open" : ""}`} />
        <div className={`bar ${isOpen ? "open" : ""}`} />
      </button>
        <div
          className={`dropdown ${isOpen ? "open" : ""}`}
          style={isOpen ? { marginTop:`${height}px`, height: `calc(100vh - ${height}px)` } : {marginTop:`${height}px`}}
        >
          <div className="link color1"               onClick={() => {
                const element = document.getElementById("about");
                element?.scrollIntoView({
                  behavior: "smooth",
                });
                toggleMenu();
              }}>
            <a

            >
              About
            </a>
          </div>
          <div className="link color2"              onClick={() => {
                const element = document.getElementById("projects");
                element?.scrollIntoView({
                  behavior: "smooth",
                });
                toggleMenu();
              }}>
            <a

            >
              Projects
            </a>
          </div>
          <div className="link color3"               onClick={() => {
                const element = document.getElementById("contact");
                element?.scrollIntoView({
                  behavior: "smooth",
                });
                toggleMenu();
              }}>
            <a

            >
              Contact
            </a>
          </div>
          <div className="link color4" onClick={toggleMenu}>
            <a>Other Stuff</a>
          </div>
        </div>
    </div>
  );
};

export default Hamburger;
