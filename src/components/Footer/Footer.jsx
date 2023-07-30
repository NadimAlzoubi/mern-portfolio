import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Footer() {
  const [aboutInfo, setAboutInfo] = useState([]);

  
  useEffect(() => {
    axios.get('https://nadim.onrender.com/aboutData')
      .then((result) => {
        setAboutInfo(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <footer className="footer container">
      {aboutInfo.map((info) => (
        <div key={info._id} className="row">
          <div className="col">
            <h3 className="footer-title">about</h3>
            <p className="text">{info.footerAbout}<br /><Link to="/about" className="nav-link"><i className="fas fa-long-arrow-alt-right"></i> read more</Link></p>
          </div>

          <div className="col">
            <h3 className="footer-title">links</h3>
            <div className="footer-links">
                <Link to="/home" className="text">home ↗</Link>
                <Link to="/about" className="text">about ↗</Link>
                <Link to="/resume" className="text">resume ↗</Link>
                <Link to="/skills" className="text">skills ↗</Link>
                {
                  projects.length > 0 ? (
                    <Link to="/projects" className="text">projects ↗</Link>
                  ) : (null)
                }
                <Link to="/contact" className="text">contact ↗</Link>
            </div>
          </div>

          <div className="col">
            <h3 className="footer-title">have a question?</h3>
            <div>
              <span>
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <span className="text">{info.address}</span>
            </div>

            <div>
              <span>
                <i className="fas fa-phone"></i>
              </span>
              <span className="text">{info.phone}</span>
            </div>

            <div>
              <span>
                <i className="fas fa-envelope"></i>
              </span>
              <span className="text">{info.email}</span>
            </div>

            <div className="contact-social-links" id="links1">
              <a href={info.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              <a href={info.youtube} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
              <a href={info.telegram} target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram"></i></a>
            </div>

            <div className="contact-social-links" id="links1">
              <a href={info.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href={info.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href={info.whatsapp} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
      ))}

      <div className="footer-text">
        <p className="text">Copyright &copy; 2022 All rights reserved | 
          <a href='https://nadim.pro'>Nadim Alzoubi</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
