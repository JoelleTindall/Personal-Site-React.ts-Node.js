import { useRef, useState } from "react";

const ContactPage: React.FC = () => {
  const myRef = useRef<HTMLDivElement>(null);
  const formRef= useRef<HTMLFormElement>(null);
   const [height, setHeight] = useState(0);
  const [formSent,setFormSent] = useState(false)
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
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Form submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setHeight(formRef.current.clientHeight);
    setFormSent(true);

  };


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
{ !formSent ?
            <form className="contactform" ref={formRef} onSubmit={handleSubmit}>
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
 :<div className="form-success" style={{height:`${height}px`}}><div className="success-msg"><h2 >Message Sent!</h2><p>I'll get back to you soon.</p></div></div> }
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
