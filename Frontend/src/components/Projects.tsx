// import chatapp from "../assets/images/chatapp.gif";
// import catapp from "../assets/images/catapp.gif";
// import touchegg from "../assets/images/Touch Egg.png";
// import monsterelevator from "../assets/images/Monster Elevator.png";
// import rpsb from "../assets/images/RPSB.png";
import axios from 'axios';
import "./components.css";
import { useEffect, useState } from "react";
export default function ProjectsPage() {

  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8000/api/fetchprojects"
      );
      setProjects(res.data);
      setLoading(false);
     
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }




  return (
    <div id="projects" className="section">
      <div className="header projects">
        <h1>Projects</h1>
        <p>Things I've made</p>
      </div>
      <div className="contentblock projects">
        <div className="corner-border">
          <div className="project-list">
            {projects.map((project, index) => (
              <div className="project">
              <a href={project.url}>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>
                    {project.description}
                  </p>
                </div>
                <div className="project-image">
                  <img src={ `http://localhost:8000/public/images/${project.imagename}`}></img>
                </div>
              </a>
            </div>

            ))}
            {/* <div className="project">
              <a href="https://github.com/JoelleTindall/.NET-Core-React-Postgres-ChatApp">
                <div className="project-info">
                  <h3>Chat App</h3>
                  <p>
                    A simple chat application built with React, .NET Core, and
                    Postgres
                  </p>
                </div>
                <div className="project-image">
                  <img src={chatapp}></img>
                </div>
              </a>
            </div> */}
            {/* <div className="project">
              <a href="https://github.com/JoelleTindall/Simple-PHP-MySQL-JS-Web-App">
                <div className="project-info">
                  
                  <h3>PHP Store</h3>
                  <p>
                    A very bare bones storefront application built with PHP,
                    JavaScript, and MySQL
                  </p>
                </div>
                <div className="project-image">
                  <img src={catapp}></img>
                </div>
              </a>
            </div> */}
            {/* <div className="project">
              <a href="/">
              <div className="project-info">
                <h3>This Website</h3>
                <p>Yep, I made this site! (placeholder image..)</p>
                </div>
                <div className="project-image">
                  <img src={chatapp}></img>
                </div>
              </a>
            </div> */}
            {/* <div className="project playdate">
              <a href="https://play.date/games/touch-egg/">
                <div className="project-info">
                  <h3>Touch Egg</h3>
                  <p>
                    A silly little game for the Playdate. Won 3 nominations!
                    Name is self explanatory
                  </p>
                </div>
                <div className="project-image">
                  <img src={touchegg}></img>
                </div>
              </a>
            </div> */}
            {/* <div className="project playdate">
              <a href="https://play.date/games/monster-elevator/">
              <div className="project-info">
                <h3>Monster Elevator</h3>
                <p>
                  Another silly little game for the Playdate. Make sandwiches
                  for semi-randomized monsters!
                </p>
                </div>
                <div className="project-image">
                  <img src={monsterelevator}></img>
                </div>
              </a>
            </div> */}
            {/* <div className="project playdate">
              <a href="https://play.date/games/rock-paper-scissors-boom/">
              <div className="project-info">
                <h3>RPSB</h3>
                <p>
                  My 3rd silly little game for the Playdate. Mix and mash
                  together rocks, papers, and scissors to create explosions.
                </p>
                </div>
                <div className="project-image">
                  <img src={rpsb}></img>
                </div>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
