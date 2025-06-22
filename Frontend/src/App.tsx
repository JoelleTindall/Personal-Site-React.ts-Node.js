import { BrowserRouter, Routes, Route } from "react-router-dom";

import AboutPage from "./components/About.tsx";
import ProjectsPage from "./components/Projects.tsx";
import ContactPage from "./components/Contact.tsx";
import OtherPage from "./components/OtherStuff.tsx";
import FileUpload from "./components/Admin.tsx";
import Login from "./components/Login.tsx";

import Layout from "./layout/layout";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NotFound from "./components/NotFound.tsx";

export default function App() {
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
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout>
                <FileUpload />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
