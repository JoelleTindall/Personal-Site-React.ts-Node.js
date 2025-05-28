import React, { type ReactNode } from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import "./layout.css";

interface Props {
  children: ReactNode;
  // any props that come into the component
}
const Layout: React.FC<Props> = ({ children }) => {
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
