import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Contact() {

  const [aboutInfo, setAboutInfo] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/aboutData')
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

        <section className="contact container">
      <div className="title">
        <h2>contact</h2>
        <div>
          <h2>get in touch</h2>
        </div>
      </div>


      {aboutInfo.map((info) => (
      <React.Fragment key={info._id}>

        <p className="text">You can contact me anywhere, anytime.</p>

      <div className="row">
        <div className="col-left">
          <h2>feel free to ask me!</h2>

          <div className="contact-info">
            <span><i className="fas fa-envelope-open"></i></span>
            <h3>
              <span className="text">mail me</span> <br />
              {info.email}
            </h3>
          </div>

          <div className="contact-info">
            <span><i className="fas fa-phone-square-alt"></i></span>
            <h3>
              <span className="text">call me</span> <br />
              {info.phone}
            </h3>
          </div>

          <div className="contact-social-links">
              <a href={info.whatsapp} target="_blank"><i className="fab fa-whatsapp"></i></a>
              <a href={info.telegram} target="_blank"><i className="fa-brands fa-telegram"></i></a>
              <a href={'tel:' + info.phone} target="_blank"><i className="fa-solid fa-phone"></i></a>
          </div>
          </div>
        </div>
        
        <div className="col-right">
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="your name" name="name" required />
              <input type="email" placeholder="your email" name="email" required />
              <input type="text" placeholder="your subject" name="_subject" />
            </div>
            <textarea rows="7" placeholder="your message" name="messag" required></textarea>
            <button type="submit" className="btn">send message</button>
          </form>
        </div>

      </React.Fragment>


))
}





    </section>
        <Footer />
    </>
  )
}

export default Contact