import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Projects.css';
import { Link } from 'react-router-dom';

function Projects() {

  const [projects, setProjects] = useState([])
  useEffect(()=>{
      axios.get('https://nadim.onrender.com/projectsData')
      .then((result)=>{
        setProjects(result.data);
      })
      .catch((err)=>{
          console.log(err);
      })
    }, [])

  const proForms = document.querySelectorAll('.proForm');
  proForms.forEach((form) => {
      form.addEventListener('mouseover', () => {
        form.classList.add('op');
      });
      form.addEventListener('mouseout', () => {
        form.classList.remove('op');
      });
    }); 

return (
  <>
    <Header />
    <section className="projects container">
      <div className="title">
        <h2>Projects</h2>
        <div>
          <h2>My Projects</h2>
        </div>
      </div>
      <p className="text">{projects.map.length > 0 ? '' : 'There are no projects currently.'}</p>
    </section>
    <div className="parent" id="parentDiv">
    {projects.length > 0 ? (
  projects.map((project) => (
    <React.Fragment key={project._id}>
      <div>
        <div className="proForm">
          <img className='proimgasp' src={"/server/uploads/" + project.coverImg} alt="Project Cover Img" />
          <Link to={'/projectDetails?projectId=' + btoa(project._id)} className="btnmo">View</Link>
        </div>
        <p className="proTitle">{project.title}</p>
      </div>
    </React.Fragment>
  ))
) : (
  <center>No Projects</center>
)}
    </div>
  <Footer />

</>
);
}

export default Projects;




