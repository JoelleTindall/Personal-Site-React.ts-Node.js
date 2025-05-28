// import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import HomePage from "./components/Home.tsx";
import AboutPage from "./components/About.tsx";
import ProjectsPage from "./components/Projects.tsx";
import ContactPage from "./components/Contact.tsx";
import OtherPage from "./components/OtherStuff.tsx";

import Layout from './layout/layout';
export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout><HomePage /></Layout>} /> */}
          <Route path="/" element={<Layout><AboutPage /><ProjectsPage /><ContactPage /></Layout>} />
          {/* <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} /> */}
          {/* <Route path="/contact" element={<Layout><ContactPage /></Layout>} /> */}
          <Route path="/otherstuff" element={<Layout><OtherPage /></Layout>} />
        </Routes>
      </BrowserRouter>

  );
}
