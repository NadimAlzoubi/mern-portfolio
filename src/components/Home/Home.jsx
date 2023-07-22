import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Home.css'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
function Home() {
  
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
      <Header />
       <section className="home container">
       {
        aboutInfo.map((info) => {
          return(
            <div key={info._id} className="row">
            <div className="row-left">
              <h3>hello!</h3>
              <h1>i'm <span>
                {info.firstName}
                <br/>
                {info.lastName}
              </span></h1>
              <h2>
                {info.jobTitle}
                
              </h2>
              <div className="home-pg-btn">
                <Link to="/contact" className="btn">hire me</Link>
                <Link to="/projects" className="btn">my works</Link>
              </div>
            </div>
    
            <div className="row-right">
              <div className="img-border">
                <div className="img-container">
                  <img className='proimg' src={"/server/uploads/" + info.coverImg} alt='cover img'/>
                </div>
              </div>
            </div>
          </div>
    
          )
        })
       }
    </section>

    <Footer />

    </>
  )
}

export default Home