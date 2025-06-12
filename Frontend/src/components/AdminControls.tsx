// import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminControls: React.FC = () => {
 const navigate = useNavigate();
    const logOut = () => {
      localStorage.removeItem("token");
      navigate("/");
    };
  return (
    <div>
      <button>Upload Project</button>
      <button>Edit/Remove Project</button>
      <button onClick={logOut}>Log Out</button>

    </div>
  );
};

export default AdminControls;
