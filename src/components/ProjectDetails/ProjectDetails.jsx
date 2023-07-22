import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './ProjectDetails.css';
import { Link } from 'react-router-dom';

function ProjectDetails() {


    const [projects, setProjects] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/projectsData')
        .then((result)=>{
          setProjects(result.data);
        })
        .catch((err)=>{
            console.log(err);
        })
      }, [])
  




    const [desiredProjectId, setDesiredProjectId] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('projectId');
        setDesiredProjectId(id);
    }, []);
return (
  <>
    <Header />
    <section className="home container">
    {
        projects.map((project) => {
            if (project._id === atob(desiredProjectId)) {
                return (
                    <React.Fragment key={project._id}>
                        <div className="project-summry">
                            <h1>{project.title}</h1>
                            <h4>{project.summry}</h4>
                            <p>{project.description}</p>
                            <h3><Link href={project.srcLink}>{project.shownText} ↗</Link></h3>
                            <br />
                            <br />
                            <h6><Link id='backbtn' to="/projects">Back to projects ↩</Link></h6>

                        </div>
                        <div className="project-imgs">
                            {
                                project.images.map((img, index)=>{
                                    return(
                                        <img key={index} src={"/server/uploads/" + img} />
                                    )
                                })
                            }
                        </div>
                    </React.Fragment>
                );
            }
            return null;
        })
    }

</section>



    <Footer />

</>
);
}

export default ProjectDetails;




