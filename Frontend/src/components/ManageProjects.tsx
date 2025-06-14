import axios from "axios";
import "./components.css";
import { useEffect, useRef, useState } from "react";
import ImageUploader from "./Uploader";
import type { ImageListType } from "react-images-uploading";

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  imagename: string;
  categoryid: string;
  category: string;
}

interface Category {
  id: string;
  category: string;
}

export default function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project_url, setProject_url] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [images, setImages] = useState<ImageListType>([]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/fetchprojects");
      setProjects(res.data);
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/fetchcategories"
        );
        setCategories(res.data);
      } catch {
        setError(true);
      }
    };

    fetchCategories();

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setId(selectedProject.id);
      setTitle(selectedProject.title);
      setDescription(selectedProject.description);
      setProject_url(selectedProject.url);
      setSelectedCategory(selectedProject.categoryid)

      const backendImg = `http://localhost:8000/public/images/${selectedProject.imagename}`;
      setImages([{ data_url: backendImg }]);
    }
  }, [selectedProject]);

  const removeProject = async (project: Project) => {
    axios
      .post("http://localhost:8000/api/delete", {
        id: project.id,
        img: project.imagename,
      })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        alert("Successful Delete");
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  const editProject = (project: Project) => {
    setSelectedProject(project);

    const backendImg = `http://localhost:8000/public/images/${project.imagename}`;
    setImages([{ data_url: backendImg }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("url", project_url);
    formData.append("categoryid", selectedCategory)
    if (images[0]?.file) {
      formData.append("image", images[0].file);
    }

    try {
      await axios.post("http://localhost:8000/api/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Project has been updated.");
      setSelectedProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="corner-border">
      <div className="project-list project-edit">
        <div className="label">
          <h2>Edit/Delete Project</h2>
        </div>
        {loading && <p>loadin...</p>}
        {!error ? (
          projects.map((project) => (
            <div className={`project ${project.category}`} key={project.id}>
              <span className="project-edit-buttons">
                <button onClick={() => editProject(project)}>Edit</button>
                <button onClick={() => removeProject(project)}>Delete</button>
              </span>
              {selectedProject?.id == project.id ? (
                <div className="formholder">
                  <div className="label">
                    <h2>Update Project</h2>
                  </div>

                  <form
                    className="projectform"
                    ref={formRef}
                    onSubmit={handleSubmit}
                  >
                    <div className="label">
                      <label>Category</label>
                    </div>
                    <div className="emailholder">
                      {!error ? (
                      <select value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {categories.map((category) => (
                          <option value={category.id} key={category.id}>
                            {category.category}
                          </option>
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
                        value={title}
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
                        value={project_url}
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
                        value={description}
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
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <a className="project-link" href={project.url}>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="project-image">
                    <img
                      src={`http://localhost:8000/public/images/${project.imagename}`}
                    ></img>
                  </div>
                </a>
              )}
            </div>
          ))
        ) : (
          <div className="project">
            <a href="/">
              <div className="project-info">
                <h3>Nothing</h3>
                <p>Something went wrong, cause there's nothing here!</p>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
