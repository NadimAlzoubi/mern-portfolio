import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditResumeData = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [link, setLink] = useState('')
  const [linkContent, setLinkContent] = useState('')
  const [logo, setLogo] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
      axios.get("http://localhost:3001/resumedata")
        .then((result) => {
          const data = result.data;
          const record = data.find(item => item._id === id);
          if (record) {
          setTitle(record.title);
          setCategory(record.category);
          setDescription(record.description);
          setDateFrom(record.dateFrom);
          setDateTo(record.dateTo);
          setLink(record.link);
          setLinkContent(record.linkContent);
          setLogo(record.logo);
        }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

  const Update = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updateresumedata/${id}`, {
        category,
        title,
        description,
        dateFrom,
        dateTo,
        link,
        linkContent,
        logo
    })
      .then((result) => {
        console.log(result);
        navigate('/resumedash');
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
                        <h2 className='mb-2 text-dark'>Update Resume Data</h2>
                        <div className="mb-2">
                            <label className='text-dark'>Title</label>
                            <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className='text-dark'>Category</label>
                            <input onChange={(e)=>{setCategory(e.target.value)}} value={category} type="text" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className='text-dark'>Description</label>
                            <input onChange={(e)=>{setDescription(e.target.value)}} value={description} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Date from</label>
                            <input onChange={(e)=>{setDateFrom(e.target.value)}} value={dateFrom} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Date to</label>
                            <input onChange={(e)=>{setDateTo(e.target.value)}} value={dateTo} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Attatchment link</label>
                            <input onChange={(e)=>{setLink(e.target.value)}} value={link} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Link text</label>
                            <input onChange={(e)=>{setLinkContent(e.target.value)}} value={linkContent} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Icon logo</label>
                            <input onChange={(e)=>{setLogo(e.target.value)}} value={logo} type="text" className="form-control" />
                        </div>
                      
                      
                        <button type='submit' className="btn btn-success mr-2">Update</button>
                        <button className="btn btn-primary" onClick={() => navigate('/resumedash')}>Cancel</button>
                    </form>    
                </div>
            </div>
    </div>
  );
};

export default EditResumeData;
