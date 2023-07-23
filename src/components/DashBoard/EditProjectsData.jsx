import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProjectsData = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summry, setSummry] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('')
  const [srcLink, setSrcLink] = useState('')
  const [shownText, setShownText] = useState('')
  const [coverImg, setCoverImg] = useState('')
//   const [images, setImages] = useState([])

  const navigate = useNavigate();











// file upload function
// file upload function
// file upload function

const [selectedCoverFile, setSelectedCoverFile] = useState(null);
const handleCoverFileChange = (event) => {
    setSelectedCoverFile(event.target.files[0]);
};
const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedCoverFile) {
      formData.append('coverFile', selectedCoverFile);
      formData.append('oldCoverImg', coverImg); // Send the filename of the old file
    }
    fetch('http://localhost:3001/uploadimage', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => {
        if (selectedCoverFile) {
          setCoverImg(data.fileName);
        }
        console.log('File uploaded from front successfully:', data.fileName);
      })
      .catch((error) => {
        console.error('Error uploading the file:', error);
      });
  };

////////////////////////////////////////////////////////////////////////////////////////////////////

const [imagesFiles, setImagesFiles] = useState([]);
const handleImagesFileChange = (event) => {
    const filesArray = Array.from(event.target.files); // Convert the FileList to an array
    setImagesFiles(filesArray);
  };

const handleUploads = (e) => {
    e.preventDefault();
    const formData = new FormData();
       if (imagesFiles.length > 0) {
        for (let i = 0; i < imagesFiles.length; i++) {
          formData.append("imagesFile", imagesFiles[i]);
        }
        formData.append('oldImages', imagesFiles); // Assuming images state contains the filenames of the old images separated by '|||'
      }
      console.log(...formData);

    fetch('http://localhost:3001/uploadimages', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => {
        if(imagesFiles){
            setImagesFiles(data.fileName.map((item) => { return item.filename }))
        }
        console.log('File uploaded from front successfully:', data.fileName.map((item) => { return item.filename }));
    })
      .catch((error) => {
        console.error('Error uploading the file:', error);
      });
  };
  




// file upload function
// file upload function
// file upload function





//  useEffect(() => {
    // This will log the updated imagesFiles value whenever it changes
    // console.log(imagesFiles[0]);
//   }, [imagesFiles]);



  useEffect(() => {
      axios.get("http://localhost:3001/projectsdata")
        .then((result) => {
          const data = result.data;
          const record = data.find(item => item._id === id);
          if (record) {
            setTitle(record.title);
            setSummry(record.summry);
            setDescription(record.description);
            setDate(record.date);
            setSrcLink(record.srcLink);
            setShownText(record.shownText);
            setCoverImg(record.coverImg);
            setImagesFiles(record.images);
        }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

  const Update = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updateprojectdata/${id}`, {
        title,
        summry,
        description,
        date,
        srcLink,
        shownText,
        coverImg,
        imagesFiles
    })
      .then((result) => {
        console.log(result);
        navigate('/projectsdash');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-4">
     <div className="d-flex justify-content-center align-items-center">
                <div className="bg-white p-3" style={{width: '90%'}}> 
                    <form onSubmit={Update}>
                        <h2 className='mb-2 text-dark'>Update Project Data</h2>
                        <div className="mb-2">
                            <label className='text-dark'>Title</label>
                            <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className='text-dark'>Summary</label>
                            <input onChange={(e)=>{setSummry(e.target.value)}} value={summry} type="text" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className='text-dark'>Description</label>
                            <input onChange={(e)=>{setDescription(e.target.value)}} value={description} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Date</label>
                            <input onChange={(e)=>{setDate(e.target.value)}} value={date} type="text" className="form-control" />
                        </div>                      
                      
                        <div className="mb-2">
                            <label className='text-dark'>Link</label>
                            <input onChange={(e)=>{setSrcLink(e.target.value)}} value={srcLink} type="text" className="form-control" />
                        </div>                      
                      
                        <div className="mb-2">
                            <label className='text-dark'>Shown text</label>
                            <input onChange={(e)=>{setShownText(e.target.value)}} value={shownText} type="text" className="form-control" />
                        </div>                      
                      




                        <br />
                        <div className="mb-2">
                          <label className='text-dark'>Choose Cover image</label>
                          <input value={"The file now is: " + coverImg} type="text" className="form-control" disabled/>
                          <input className='text-dark' type="file" onChange={handleCoverFileChange} />
                          <button className='text-dark' onClick={handleUpload}>Upload</button>
                        </div>
                        
                        <br />
                        <div className="mb-2">
                          <label className='text-dark'>Choose Personal image</label>
                          <input value={"The files now are: " + imagesFiles} type="text" className="form-control" disabled/>
                          <input multiple className='text-dark' type="file" onChange={handleImagesFileChange} />
                          <button className='text-dark' onClick={handleUploads}>Upload</button>
                        </div>




                      
                        <button type='submit' className="btn btn-success mr-2">Update</button>
                        <button className="btn btn-primary" onClick={() => navigate('/projectsdash')}>Cancel</button>
                    </form>    
                </div>
            </div>
    </div>
  );
};

export default EditProjectsData;
