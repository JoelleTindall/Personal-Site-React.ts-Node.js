import { useRef, useState } from "react";
import workcat from "../assets/images/workcat.gif";

const ContactPage: React.FC = () => {

  const myRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [height, setHeight] = useState(0);
    const [status, setStatus] = useState<
    'initial' | 'sending' | 'success' | 'fail'
  >('initial');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData);

    try {
      setHeight(formRef.current!.clientHeight);
      setStatus('sending');
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        setStatus('success');
      
      } else {
        setStatus('fail');
        console.error("Form submission failed.");
      }
    } catch (error) {
       setStatus('fail');
      console.error("Error submitting form:", error);
    }
    
  };

  return (
    <div id="contact" className="section" ref={myRef}>
      <div className="header contact">
        <h1>Contact Me</h1>
        <p>I'd love to hear from you!</p>
      </div>
      <div className="contentblock contact">
        <div className="side-content">
          <h1><svg xmlns="http://www.w3.org/2000/svg" width="6cqw" height="100%" fill="currentColor"  viewBox="0 0 16 14">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg> Email</h1>
        </div>
        <div className="corner-border">
          <div className="formholder">
            {status=='initial' ? (
              <form
                className="contactform"
                ref={formRef}
                onSubmit={handleSubmit}
              >
                <div className="label">
                  <label>Name</label>
                </div>
                <div className="emailholder">
                  <input
                    className="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    type="text"
                    placeholder="Name McNamerson"
                    required
                  ></input>
                </div>
                <div className="label">
                  <label>Email</label>
                </div>
                <div className="emailholder">
                  <input
                    className="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    type="email"
                    placeholder="cool@example.com"
                    required
                  ></input>
                </div>
                <div className="label">
                  <label>Message</label>
                </div>
                <div className="messageholder">
                  <textarea
                    className="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="What do you think?"
                    required
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
            ) : (
              <div className="form-success" style={{ height: `${height}px` }}>
                
                  <Result status={status} setStatus={setStatus}/>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Result = ({ status,setStatus }: { status: string, setStatus: React.Dispatch<React.SetStateAction<"initial" | "sending" | "success" | "fail">> }) => {
  if (status === 'success') {
    return<div className="success-msg"><h2>Message Sent!</h2><p>I'll get back to you soon.</p></div>;
  } else if (status === 'fail') {
    return <div className="success-msg"><h2>Failed!</h2><a onClick={()=>{setStatus('initial')}}>Maybe try again?</a></div>;
  } else if (status === 'sending') {
    return <div className="success-msg"><h2>Sending...</h2><p><img src={workcat}/></p></div>;
  } else {
    return null;
  }
};

export default ContactPage;
