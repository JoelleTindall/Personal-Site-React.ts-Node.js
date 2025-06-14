import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { ImageListType } from "react-images-uploading";
import ImageUploader from "./Uploader";

interface Category {
  id: string;
  category: string;
}

const ProjectUpload: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formSent, setFormSent] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project_url, setProject_url] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [images, setImages] = useState<ImageListType>([]);
const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
       
        const res = await axios.get("http://localhost:8000/api/fetchcategories");
        setCategories(res.data);
      
      } catch {
       
        setError(true);
      }
    };

    fetchCategories();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryid",selectedCategory)
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
      alert("Project has been uploaded.");
    } catch (error) {
      console.error("Submission error:", error);
    }

    setFormSent(true);
  };

  return (
    <div className="formholder">
      <div className="label">
        <h2>Upload Project</h2>
      </div>
      {!formSent ? (
        <form className="projectform" ref={formRef} onSubmit={handleSubmit}>
          <div className="label">
            <label>Category</label>
          </div>
          <div className="emailholder">
            {!error ? (
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category) => (
              <option value={category.id} key={category.id}>{category.category}</option>
              ))}
            </select>
            ):(<p>Couldn't get categories..</p>)}
          </div>

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
          <div className="label">
            <label>Image Upload</label>
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
  );
};
export default ProjectUpload;
