import axios from "axios";
import "./components.css";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  imagename: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
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

    fetchProjects();
  }, []);

  return (
    <div id="projects" className="section">
      <div className="header projects">
        <h1>Projects</h1>
        <p>Things I've made</p>
      </div>
      <div className="contentblock projects">
        <div className="corner-border">
          <div className="project-list">
            {loading && <p>loadin...</p>}
            {!error ? (
              projects.map((project) => (
                <div key={project.id} className="project">
                  <a href={project.url}>
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
      </div>
    </div>
  );
}
