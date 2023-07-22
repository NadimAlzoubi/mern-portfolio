import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import { skills } from '../../myconstants';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
function Skills() {
  const renderedCategories = [];

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/skillsData')
      .then((result) => {
        setSkills(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
    <Header/>
      <section className="skills container">
        <div className="title">
          <h2>skills</h2>
          <div>
            <h2>my skills</h2>
          </div>
        </div>
        {/* <p className="text">skills summary</p> */}

        {skills.map((item) => {
          if (!renderedCategories.includes(item.category)) {
            renderedCategories.push(item.category);
            return (
              <React.Fragment key={item._id}>
                <div>
                  <h2 style={{ textAlign: 'center', fontSize: 'xxx-large' }}>
                    {item.category}
                  </h2>
                </div>
                <div className="row">
                  {skills.map((itemByCategory) => {
                    if (item.category === itemByCategory.category) {
                      return (
                        <div key={itemByCategory._id} className="item">
                          <div className="item-text">
                            <span>{itemByCategory.name}</span>
                            <span className="w-80">{itemByCategory.shownText}</span>
                          </div>
                          <div className="progress">
                            <div className={`progress-bar w-${itemByCategory.per}`}></div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </React.Fragment>
            );
          }
        })}
      </section>
      <Footer/>
    </>
  );
}

export default Skills;
