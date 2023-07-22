import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
function Header() {
    const [aboutInfo, setAboutInfo] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/aboutData')
        .then((result)=>{
          setAboutInfo(result.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])
  return (
    <>  
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
          {
            aboutInfo.map((item) => {
              return(
                <a key={item._id} className="navbar-brand" href="/">{item.firstName}</a>
              )
            }
            )
          }
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><i className="fa-solid fa-bars"></i></span>
          </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/home" className="nav-link">home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">about</Link>
        </li>
        <li className="nav-item">
          <Link to="/resume" className="nav-link">resume</Link>
        </li>
        <li className="nav-item">
          <Link to="/skills" className="nav-link">skills</Link>
        </li>
        <li className="nav-item">
          <Link to="/projects" className="nav-link">projects</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">contact</Link>
        </li>
        <li className="nav-item">
          <Link to="/dash" className="nav-link">dash</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  );
}

export default Header;
