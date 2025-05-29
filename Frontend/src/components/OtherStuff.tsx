import { useRef } from "react";
import workcat from "../assets/images/workcat.gif";
const ContactPage: React.FC = () => {
  const myRef = useRef<HTMLDivElement>(null);

  return (
    <div id="otherstuff" className="section" ref={myRef}>
      <div className="header contact">
        <h1>Other Stuff</h1>
        <p>Look at all this stuff!</p>
      </div>
      <div className="contentblock contact">
        <div className="underconstruction">
    <img src={workcat}></img>
    <p>Under Construction!</p>
</div>
      </div>
    </div>
  );
};
export default ContactPage;
