import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddResumeData = () => {
//   const { id } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [link, setLink] = useState('')
  const [linkContent, setLinkContent] = useState('')
  const [logo, setLogo] = useState('')
  const navigate = useNavigate();


  const Insert = (e) => {
    e.preventDefault();
    axios.put(`https://nadim.onrender.com/addresumedata`, {
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
      <details>
        <summary>
        icon search
        </summary>
        <iframe
            src="https://bootsnipp.com/iconsearch?library=font-awesome"
            width="100%"
            height="400"
            title="Example Website"
        />
        </details>
     <div className="d-flex justify-content-center align-items-center">
                <div className="bg-white p-3" style={{width: '90%'}}> 
                    <form onSubmit={Insert}>
                        <h2 className='mb-2 text-dark'>Insert Resume Data</h2>
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
                        <button type='submit' className="btn btn-success mr-2">Save</button>
                        <button className="btn btn-primary" onClick={() => navigate('/resumedash')}>Cancel</button>
                    </form>    
                </div>
            </div>
    </div>
  );
};

export default AddResumeData;
