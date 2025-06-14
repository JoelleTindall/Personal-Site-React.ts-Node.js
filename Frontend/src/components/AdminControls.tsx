import { useNavigate } from "react-router-dom";

   interface Props {
     onSelection: (value: string) => void;
   }

const AdminControls: React.FC<Props> = ({onSelection}) => {
 const navigate = useNavigate();
    const logOut = () => {
      localStorage.removeItem("token");
      navigate("/");
    };

      const handleClick = (selection:string) => {
    onSelection(selection);
  };
  return (
    <div>
      <button onClick={()=>handleClick("upProject")}>Upload Project</button>
      <button onClick={()=>handleClick("editProject")}>Edit/Remove Project</button>
      <button onClick={()=>handleClick("upResume")}>Upload Resume</button>
      <button onClick={logOut}>Log Out</button>

    </div>
  );
};

export default AdminControls;
