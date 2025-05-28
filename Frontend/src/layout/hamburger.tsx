import React, { useState } from "react";
import "./hamburger.css";
interface Props {
  children: React.ReactNode;
}

const Hamburger: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-icon" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "open" : ""}`} />
        <div className={`bar ${isOpen ? "open" : ""}`} />
        <div className={`bar ${isOpen ? "open" : ""}`} />
      </button>
      {/* <div className={`menu-items ${isOpen ? "show" : "hide"}`}>
        <a className="about"
          onClick={() => {
            const element = document.getElementById("about");
            element?.scrollIntoView({
              behavior: "smooth",
            });
            toggleMenu();
          }}
        >
          <h3>About</h3>
        </a>
        <a className="projects"
          onClick={() => {
            const element = document.getElementById("projects");
            element?.scrollIntoView({
              behavior: "smooth",
            });
            toggleMenu();
          }}
        >
          <h3>Projects</h3>
        </a>
        <a className="contact"
          onClick={() => {
            const element = document.getElementById("contact");
            element?.scrollIntoView({
              behavior: "smooth",
            });
            toggleMenu();
          }}
        >
          <h3>Contact</h3>
        </a>
        <a href="/otherstuff"><h3>Other Stuff</h3></a>
      </div> */}
    </div>
  );
};

export default Hamburger;
