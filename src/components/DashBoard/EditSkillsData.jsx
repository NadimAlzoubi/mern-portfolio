import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditSkillsData = () => {
  const { id } = useParams();
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [per, setPer] = useState('');
  const [shownText, setShownText] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
      axios.get("http://localhost:3001/skillsdata")
        .then((result) => {
          const data = result.data;
          const record = data.find(item => item._id === id);
          if (record) {
            setCategory(record.category);
            setName(record.name);
            setPer(record.per);
            setShownText(record.shownText);
        }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

  const Update = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updateskillsdata/${id}`, {
        category,
        name,
        per,
        shownText
    })
      .then((result) => {
        console.log(result);
        navigate('/skillsdash');
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
                        <h2 className='mb-2 text-dark'>Update Skill Data</h2>
                        <div className="mb-2">
                            <label className='text-dark'>Skill name</label>
                            <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className='text-dark'>Category</label>
                            <input onChange={(e)=>{setCategory(e.target.value)}} value={category} type="text" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className='text-dark'>Percentage / Value {"(Starting from 10 to 100 by 5 increments)"}</label>
                            <input onChange={(e)=>{setPer(e.target.value)}} value={per} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>shown text</label>
                            <input onChange={(e)=>{setShownText(e.target.value)}} value={shownText} type="text" className="form-control" />
                        </div>                      
                      
                        <button type='submit' className="btn btn-success mr-2">Update</button>
                        <button className="btn btn-primary" onClick={() => navigate('/skillsdash')}>Cancel</button>
                    </form>    
                </div>
            </div>
    </div>
  );
};

export default EditSkillsData;
