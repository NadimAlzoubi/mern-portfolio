import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './About.css';

function About() {
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

  return (
    <>
      <Header />

      <section className="about container">
        <div className="title">
          <h2>about</h2>
          <div>
            <h2>about me</h2>
          </div>
        </div>

        {aboutInfo.map((info) => (
          <div key={info._id} className="row">
            <div className="row-left">
              <img src={"/server/uploads/" + info.personalImg} alt="about photo" style={{borderRadius: '50%'}}/>
            </div>

            <div className="row-right">
              <p className="text">{info.aboutMe}</p>
              <div className="about-content">
                <ul>
                  <li className="text">
                    <span>Name: </span>
                    <span>{info.firstName + ' ' + info.lastName}</span>
                  </li>
                  <li className="text">
                    <span>Date of Birth: </span>
                    <span>{info.dateOfBirth}</span>
                  </li>
                  <li className="text">
                    <span>Email: </span>
                    <span>{info.email}</span>
                  </li>
                  <li className="text">
                    <span>Phone: </span>
                    <span>{info.phone}</span>
                  </li>
                  <li className="text">
                    <span>Address: </span>
                    <span>{info.address}</span>
                  </li>
                </ul>
              </div>
              <a href={"/server/uploads/" + info.cvLink} className="btn btn1" style={{ color: '#111' }} download>
                download cv
              </a>
              <span style={{ margin: '0 1.5rem' }}> OR </span>
              <a href={"/server/uploads/" + info.cvLink} target='_blank' className="btn btn1" style={{ color: '#111' }}>
                view cv
              </a>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}

export default About;
