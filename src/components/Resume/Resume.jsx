import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Resume() {
  const renderedCategories = [];
  const [resume, setResume] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/resumeData')
      .then((result) => {
        setResume(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />

      <section className="resume container">
        <div className="title">
          <h2>resume</h2>
          <div>
            <h2>resume</h2>
          </div>
        </div>

         <p className="text"></p>

        {resume.map((item) => {
          if (!renderedCategories.includes(item.category)) {
            renderedCategories.push(item.category);
            return (
              <React.Fragment key={item._id}>
                <div className="title">
                  <h2>{item.category}</h2>
                </div>
                <div className="row">
                  {resume
                    .filter((itemByCategory) => item.category === itemByCategory.category)
                    .map((itemByCategory) => (
                      <div key={itemByCategory._id} className="item">
                        <div className="icon">
                          <i className={itemByCategory.logo}></i>
                        </div>
                        {itemByCategory.dateFrom && (
                          <span>
                            {itemByCategory.dateFrom === itemByCategory.dateTo
                              ? itemByCategory.dateFrom
                              : `${itemByCategory.dateFrom} → ${itemByCategory.dateTo}`}
                          </span>
                        )}
                        <h2>{itemByCategory.title}</h2>
                        <p className="text">{itemByCategory.description}</p>
                        <br />
                        {itemByCategory.link && (
                          <a href={itemByCategory.link} target="_blank" rel="noopener noreferrer">
                            {itemByCategory.linkContent} ↗
                          </a>
                        )}
                      </div>
                    ))}
                </div>
              </React.Fragment>
            );
          }
          return null;
        })}
      </section>

      <Footer />
    </>
  );
}

export default Resume;
