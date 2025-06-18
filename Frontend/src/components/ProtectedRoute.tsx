import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {

  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {

const navigate = useNavigate();
  const validateToken = async () => {
    const token = localStorage.getItem("token");
    
    console.log(token);
    try {
      const response = await axios.get("/api/validateToken",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unknown error:", error);
      }
      navigate('/login');
    }
    
  };

   useEffect(() => {
    validateToken();


   });

  return children;
};

export default ProtectedRoute;
