import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dash.css'
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const ResumeData = () => {
  
  const [resumeData, setResumeData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:3001/resumeData')
      .then((result) => {
        setResumeData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Delete = (resumeId) => {
    axios.delete(`http://localhost:3001/deleteresumedata/${resumeId}`)
      .then((result) => {
        console.log(result);
        alert("Deleted successfully!");
        navigate('/resumedash');
        // Handle the success response here (e.g., show a success message)
        // Optionally, you can update the frontend state to reflect the changes
      })
      .catch((err) => {
        console.log(err);
        alert("Deleted Failed!");
        // Handle the error response here (e.g., show an error message)
      });
  };
  

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
      <Link to={'/filepre'} style={{marginRight: '1.5rem', borderRadius: '4px', padding: '10px'}} className="mb-4 btn bg-primary text-white" variant="primary">
        Fs
      </Link>
      <br />
      <Link to={'/addresumedash'} style={{marginRight: '1.5rem', borderRadius: '4px', padding: '10px'}} className="mb-4 btn bg-success text-white" variant="primary">
        Add +
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center display-4'>
            <th colSpan={2}>Resume Data</th>
          </tr>
          <tr>
            <th>Title</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {resumeData.map((record, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>Title</td>
                <td>{record.title}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{record.category}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{record.description}</td>
              </tr>
              <tr>
                <td>Date from</td>
                <td>{record.dateFrom}</td>
              </tr>
              <tr>
                <td>Date to</td>
                <td>{record.dateTo}</td>
              </tr>
              <tr>
                <td>Link</td>
                <td>{record.link}</td>
              </tr>
              <tr>
                <td>Link content</td>
                <td>{record.linkContent}</td>
              </tr>
              <tr>
                <td>Logo icon</td>
                <td>{record.logo}</td>
              </tr>
              <tr>
                <td>Options</td>
                <td>
                  <button  className="btn"
                   onClick={() => {
                    if (window.confirm('Are you sure you want to delete this data?')) {
                      Delete(record._id); // Assuming 'resumeId' is the unique identifier for each resume document
                    }
                  }}
                  >Delete</button>
                  {' '}
                  <Link to={`/updateresumedata/${record._id}`} className="btn">Edit</Link>
                </td>
              </tr>
              <tr className='text-center display-4'>
                <th colSpan={2} className='bg-dark'></th>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ResumeData;
