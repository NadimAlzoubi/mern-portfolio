// client/src/FilePreview.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FilePreview = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/fsfiles');
      setFiles(response.data);
    } catch (err) {
      alert("Error fetching files: ", err);
      console.error('Error fetching files:', err);
    }
  };

  const deleteFile = async (filename) => {
    try {
      await axios.delete(`http://localhost:3001/fsfiles/${filename}`);
      fetchFiles();
    } catch (err) {
      alert(`Error deleting ${filename}:`, err);
      console.error(`Error deleting ${filename}:`, err);
    }
  };

  const getTotalSize = () => {
    const totalSize = files.reduce((total, file) => total + file.size, 0);
    return (totalSize / (1024 * 1024)).toFixed(2); // Convert bytes to MB with 2 decimal places
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

      <h1 className="mb-4">File Preview and Management</h1>
      <h2 className="mb-3">Total Size: {getTotalSize()} MB</h2>
      <ul className="list-group">
        {files.map((file) => (
          <li key={file.name} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="media d-flex w-50 align-items-center">
              <img
                src={`/server/uploads/${file.name}`}
                alt={file.name}
                className="mr-3"
                width="64"
                height="64"
                style={{width: 'fit-content', marginRight: '1em'}}
              />
              <div className="media-body">
                <h5 className="mt-0 mb-1">{file.name}</h5>
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </div>
            </div>
            <button className="btn btn-danger" onClick={() => deleteFile(file.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilePreview;
