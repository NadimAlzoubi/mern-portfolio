import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/style.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Resume from './components/Resume/Resume';
import Error from './components/Error/Error';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import ProjectDetails from './components/ProjectDetails/ProjectDetails';
import Contact from './components/Contact/Contact';
import Dash from './components/DashBoard/Dash';
import EditDash from './components/DashBoard/EditeData';
import ResumeData from './components/DashBoard/resumedata';
import AddResumeData from './components/DashBoard/AddResumeData';
import EditResumeData from './components/DashBoard/EditResumeData';
import SkillsData from './components/DashBoard/SkillsData';
import AddSkillsData from './components/DashBoard/AddSkillsData';
import EditSkillsData from './components/DashBoard/EditSkillsData';
import ProjectsData from './components/DashBoard/ProjectsData';
import AddProjectsData from './components/DashBoard/AddProjectsData';
import EditProjectsData from './components/DashBoard/EditProjectsData';
import Login from './components/Login/Login';
import FilePreview from './components/Fs/Fs';
import Tit from './components/Tit/Tit';
function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };
  return (
      <React.Fragment>
        <Tit />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ProjectDetails" element={<ProjectDetails />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          <Route path="/filepre" element={loggedInUser ? <FilePreview /> : <Error />} />
          
          <Route path="/dash" element={loggedInUser ? <Dash /> : <Navigate to="/login" />} />
          <Route path="/updatedata/:id" element={loggedInUser ? <EditDash /> : <Error />} />
          <Route path="/resumedash" element={loggedInUser ? <ResumeData /> : <Error />} />
          <Route path="/addresumedash" element={loggedInUser ? <AddResumeData /> : <Error />} />
          <Route path="/updateresumedata/:id" element={loggedInUser ? <EditResumeData /> : <Error />} />
          <Route path="/skillsdash" element={loggedInUser ? <SkillsData /> : <Error />} />
          <Route path="/addskillsdash" element={loggedInUser ? <AddSkillsData /> : <Error />} />
          <Route path="/updateskillsdata/:id" element={loggedInUser ? <EditSkillsData /> : <Error />} />
          <Route path="/projectsdash" element={loggedInUser ? <ProjectsData /> : <Error />} />
          <Route path="/addprojectsdash" element={loggedInUser ? <AddProjectsData /> : <Error />} />
          <Route path="/updateprojectdata/:id" element={loggedInUser ? <EditProjectsData /> : <Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </React.Fragment>
  );
}

export default App;
