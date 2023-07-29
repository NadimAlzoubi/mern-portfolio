import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dash.css'
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const ProjectsData = () => {
  
  const [projectsData, setProjectsData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:3001/projectsData')
      .then((result) => {
        setProjectsData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const Delete = (projectId) => {
    axios.delete(`http://localhost:3001/deleteprojectsdata/${projectId}`)
      .then((result) => {
        console.log(result);
        alert("Deleted successfully!");
        navigate('/projectsdash');
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
      <Link to={'/addprojectsdash'} style={{marginRight: '1.5rem', borderRadius: '4px', padding: '10px'}} className="mb-4 btn bg-success text-white" variant="primary">
        Add +
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr className='text-center display-4'>
            <th colSpan={2}>Projects Data</th>
          </tr>
          <tr>
            <th>Title</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {projectsData.map((record, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>Title</td>
                <td>{record.title}</td>
              </tr>
              <tr>
                <td>Summary</td>
                <td>{record.summry}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{record.description}</td>
              </tr>
              <tr>
                <td>launch date</td>
                <td>{record.date}</td>
              </tr>
              <tr>
                <td>Link</td>
                <td>{record.srcLink}</td>
              </tr>
              <tr>
                <td>Shown text</td>
                <td>{record.shownText}</td>
              </tr>
              <tr>
                <td>Cover image</td>
                <td>{record.coverImg}</td>
              </tr>
              <tr>
                <td>Project images</td>
                <td>
                    {record.images.map((img, index) => {
                    return (
                        <React.Fragment key={index}>
                        {img}
                        <br />
                        </React.Fragment>
                    );
                    })}
                </td>
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
                  <Link to={`/updateprojectdata/${record._id}`} className="btn">Edit</Link>
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

export default ProjectsData;
