import React, { useRef, useState } from "react";
import axios from "axios";
import type { ImageListType } from "react-images-uploading";

import ImageUploader from "./Uploader";
import { Navigate } from "react-router-dom";




const ContactPage: React.FC = () => {

  const myRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formSent, setFormSent] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project_url, setProject_url] = useState("");
  const [images, setImages] = useState<ImageListType>([]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("url", project_url);
    if (images[0]?.file) {
      formData.append("image", images[0].file);
    }

    try {
      await axios.post("http://localhost:8000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
    }

    setFormSent(true);
  };

  return (
    <div id="otherstuff" className="section" ref={myRef}>
      <div className="header contact">
        <h1>Other Stuff</h1>
        <p>Look at all this stuff!</p>
      </div>
      <div className="contentblock contact">
        <div className="formholder">
          {!formSent ? (
            <form className="projectform" ref={formRef} onSubmit={handleSubmit}>
              <div className="label">
                <label>Name</label>
              </div>
              <div className="emailholder">
                <input
                  className="email"
                  name="name"
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Project Name"
                ></input>
              </div>
              <div className="label">
                <label>URL</label>
              </div>
              <div className="emailholder">
                <input
                  className="email"
                  name="url"
                  onChange={(e) => setProject_url(e.target.value)}
                  type="text"
                  placeholder="Project URL"
                ></input>
              </div>
              <div className="label">
                <label>Description</label>
              </div>
              <div className="messageholder">
                <textarea
                  className="message"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Project Description"
                ></textarea>
              </div>
              <ImageUploader images={images} setImages={setImages} />
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
            <div className="form-success">
              <div className="success-msg">
                <h2>Uploaded!</h2>
                <p>Feel free to add another</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
