import React, { useRef, useState } from "react";

import AdminControls from "./AdminControls";

import FileUpload from "./ProjectUpload";
import ManageProjects from "./ManageProjects";
import UploadResume from "./UploadResume";

const AdminArea: React.FC = () => {
  const myRef = useRef<HTMLDivElement>(null);

    const [selection, setSelection] = useState('');

  const handleSelection = (btnSelection:string) => {
    setSelection(btnSelection);
  };

 const renderSwitch = (select:string) => {
  switch(select) {
    case 'upProject':
      return <FileUpload/>;
    case 'editProject':
      return <ManageProjects/>;
     case 'upResume':
       return <UploadResume/>;
    default:
      return <FileUpload/>;
  };
};

  return (
    <div id="otherstuff" className="section" ref={myRef}>
      <div className="header contact">
        <h1>Admin</h1>
        <AdminControls onSelection={handleSelection}/>
      </div>
      <div className="contentblock contact">
        {renderSwitch(selection)}
      </div>
    </div>
  );
};
export default AdminArea;
