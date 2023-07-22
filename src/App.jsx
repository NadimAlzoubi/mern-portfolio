import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/css/style.css'
import { Routes ,Route } from'react-router-dom'
import Home from './components/Home/Home'
import About from './components/About/About'
import Resume from './components/Resume/Resume'
import Error from './components/Error/Error'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import ProjectDetails from './components/ProjectDetails/ProjectDetails' 
import Contact from './components/Contact/Contact'
import Dash from './components/DashBoard/Dash'
import EditDash from './components/DashBoard/EditeData'
import ResumeData from './components/DashBoard/resumedata'
import AddResumeData from './components/DashBoard/AddResumeData'
import EditResumeData from './components/DashBoard/EditResumeData'
import SkillsData from './components/DashBoard/SkillsData'
import AddSkillsData from './components/DashBoard/AddSkillsData'
import EditSkillsData from './components/DashBoard/EditSkillsData'
import ProjectsData from './components/DashBoard/ProjectsData'
import EditProjectsData from './components/DashBoard/EditProjectsData'
function App() {

  return (
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/resume' element={<Resume/>}></Route>
          <Route path='/skills' element={<Skills/>}></Route>
          <Route path='/projects' element={<Projects/>}></Route>
          <Route path='/ProjectDetails' element={<ProjectDetails/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/dash' element={<Dash/>}></Route>
          <Route path='/updatedata/:id' element={<EditDash/>}></Route>
          <Route path='/resumedash' element={<ResumeData/>}></Route>
          <Route path='/addresumedash' element={<AddResumeData/>}></Route>
          <Route path='/updateresumedata/:id' element={<EditResumeData/>}></Route>
          <Route path='/skillsdash' element={<SkillsData/>}></Route>
          <Route path='/addskillsdash' element={<AddSkillsData/>}></Route>
          <Route path='/updateskillsdata/:id' element={<EditSkillsData/>}></Route>
          <Route path='/projectsdash' element={<ProjectsData/>}></Route>
          <Route path='/updateprojectdata/:id' element={<EditProjectsData/>}></Route>

          <Route path="*" element={<Error />} />
        </Routes>  
  )
}

export default App
