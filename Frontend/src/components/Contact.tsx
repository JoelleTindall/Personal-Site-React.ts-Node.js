// import { useParams } from 'react-router-dom';
import { useRef } from "react";

const ContactPage: React.FC = () => {
  const myRef = useRef<HTMLDivElement>(null);

  return (
    <div id="contact" className="section" ref={myRef}>
      <div className="header contact">
        <h1>Contact Me</h1>
        <p>I'd love to hear from you!</p>
      </div>
      <div className="contentblock contact">
        <div className="side-content">
          <h1>Email</h1>
        </div>
        <div className="corner-border">
          <div className="formholder">
            <form className="contactform">
              <div className="label">
                <label>Name</label>
              </div>
              <div className="emailholder">
                <input
                  className="name"
                  type="text"
                  placeholder="Name McNamerson"
                ></input>
              </div>
              <div className="label">
                <label>Email</label>
              </div>
              <div className="emailholder">
                <input
                  className="email"
                  type="email"
                  placeholder="cool@example.com"
                ></input>
              </div>
              <div className="label">
                <label>Message</label>
              </div>
              <div className="messageholder">
                <textarea
                  className="message"
                  placeholder="What do you think?"
                ></textarea>
              </div>
              <div className="btnholder">
                <button className="submitbtn" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                  </svg>{" "}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
