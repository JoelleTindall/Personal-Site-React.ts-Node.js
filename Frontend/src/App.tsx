import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import AboutPage from "./components/About.tsx";
import ProjectsPage from "./components/Projects.tsx";
import ContactPage from "./components/Contact.tsx";
import OtherPage from "./components/OtherStuff.tsx";
import FileUpload from "./components/FileUpload.tsx";

import Layout from "./layout/layout";

export default function App() {
  useEffect(() => {
    const navHeight = document.getElementById("stickynav")?.clientHeight || 0;
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    sections.forEach((section) => {
      //-1 here so sectionTop and scrollmargintop don't overlap
      section.style.scrollMarginTop = `${navHeight - 1}px`;
    });

    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - navHeight;

        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          // sets anchor tags
          window.history.replaceState(null, "", `#${section.id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <section id="about">
                <AboutPage />
              </section>
              <section id="projects">
                <ProjectsPage />
              </section>
              <section id="contact">
                <ContactPage />
              </section>
            </Layout>
          }
        />

        <Route
          path="/otherstuff"
          element={
            <Layout>
              <OtherPage />
            </Layout>
          }
        />
        <Route 
        path="/upload"
        element={
          <Layout>
            <FileUpload/>
          </Layout>
        }/>
      </Routes>
    </BrowserRouter>
  );
}
