import { useRef } from "react";
import workcat from "../assets/images/workcat.gif";
const NotFound: React.FC = () => {
  const myRef = useRef<HTMLDivElement>(null);

  return (
    <div id="otherstuff" className="section" ref={myRef}>
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <h1>404</h1>
        <p>Nothing is here! Sorry!</p>
      </div>
      <div>
        <div className="underconstruction" style={{ paddingTop: "100px" }}>
          <a href="/"><img src={workcat}></img>
          <p>Go Home, Please</p></a>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
