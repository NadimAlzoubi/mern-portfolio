import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dash.css'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Dash = () => {
  
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
    <div className="container mt-4">
      <Link to={'/home'} style={{marginRight: '1.5rem', borderRadius: '4px', padding: '10px'}} className="mb-4 btn bg-primary text-white" variant="primary">
        Exit ⨉
      </Link>
      <Link to={'/dash'} style={{marginRight: '1.5rem', borderRadius: '4px', padding: '10px'}} className="mb-4 btn bg-primary text-white" variant="primary">
        About Data
      </Link>
      <Link to={'/resumedash'} style={{marginRight: '1.5rem', borderRadius: '4px', padding: '10px'}} className="mb-4 btn bg-primary text-white" variant="primary">
        Resume Data
      </Link>
      <Link to={'/skillsdash'} style={{marginRight: '1.5rem', borderRadius: '4px', padding: '10px'}} className="mb-4 btn bg-primary text-white" variant="primary">
        Skills Data
      </Link>
      <Link to={'/projectsdash'} style={{marginRight: '1.5rem', borderRadius: '4px', padding: '10px'}} className="mb-4 btn bg-primary text-white" variant="primary">
        Projects Data
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr className='text-center display-4'>
            <th colSpan={2}>About Data</th>
          </tr>
          <tr>
            <th>Title</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {aboutInfo.map((record, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>First Name</td>
                <td>{record.firstName}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{record.lastName}</td>
              </tr>
              <tr>
                <td>Job title</td>
                <td>{record.jobTitle}</td>
              </tr>
              <tr key={index + 1}>
                <td>Date of birth</td>
                <td>{record.dateOfBirth}</td>
              </tr>
              <tr key={index + 2}>
                <td>About Me</td>
                <td>{record.aboutMe}</td>
              </tr>
              <tr key={index + 3}>
                <td>Footer resume</td>
                <td>{record.footerAbout}</td>
              </tr>
              <tr key={index + 4}>
                <td>CV Link</td>
                <td>{record.cvLink}</td>
              </tr>
              <tr key={index + 5}>
                <td>Address</td>
                <td>{record.address}</td>
              </tr>
              <tr key={index + 6}>
                <td>Phone</td>
                <td>{record.phone}</td>
              </tr>
              <tr key={index + 7}>
                <td>Email</td>
                <td>{record.email}</td>
              </tr>
              <tr key={index + 8}>
                <td>Linkedin link</td>
                <td>{record.linkedin}</td>
              </tr>
              <tr key={index + 9}>
                <td>YouTube link</td>
                <td>{record.youtube}</td>
              </tr>
              <tr key={index + 10}>
                <td>Instagram link</td>
                <td>{record.instagram}</td>
              </tr>
              <tr key={index + 11}>
                <td>WhatsApp link</td>
                <td>{record.whatsapp}</td>
              </tr>
              <tr key={index + 12}>
                <td>Telegram link</td>
                <td>{record.telegram}</td>
              </tr>
              <tr key={index + 14}>
                <td>Nice/Cover image</td>
                <td>{record.coverImg}</td>
              </tr>
              <tr key={index + 13}>
                <td>Personal image</td>
                <td>{record.personalImg}</td>
              </tr>
              <tr key={index + 15}>
                <td>Options</td>
                <td>
                  {' '}
                  <Link to={`/updatedata/${record._id}`} className="btn">Edit</Link>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Dash;
