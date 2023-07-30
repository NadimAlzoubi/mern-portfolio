import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditDash = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [cvLink, setCvLink] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [footerAbout, setFooterAbout] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [youtube, setYoutube] = useState('')
  const [instagram, setInstagram] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [telegram, setTelegram] = useState('')
  const [personalImg, setPersonalImg] = useState('')
  const [coverImg, setCoverImg] = useState('')
  const navigate = useNavigate();
  
  // file upload function
  // file upload function
  // file upload function
  
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const [selectedPersonalFile, setSelectedPersonalFile] = useState(null);
  const [selectedCvFile, setSelectedCvFile] = useState(null);
  
const handleCvFileChange = (event) => {
  setSelectedCvFile(event.target.files[0])
}

const handleCoverFileChange = (event) => {
  setSelectedCoverFile(event.target.files[0]);
};

const handlePersonalFileChange = (event) => {
  setSelectedPersonalFile(event.target.files[0]);
};
const handleUpload = (e) => {
  e.preventDefault();
    const formData = new FormData();
    if(selectedCoverFile){
      formData.append('coverFile', selectedCoverFile);
      formData.append('oldCoverImg', coverImg);
    }
    if(selectedPersonalFile){
      formData.append('personalFile', selectedPersonalFile);
      formData.append('oldPersonalImg', personalImg);
    }
    if(selectedCvFile){
      formData.append('cvFile', selectedCvFile);
      formData.append('oldCvFile', cvLink);
    }

    fetch('https://nadim.onrender.com/upload', {
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
          setCoverImg(data.coverFileName);
        console.log('File uploaded from front successfully:', data.coverFileName);

        }
        if (selectedPersonalFile) {
          setPersonalImg(data.personalFileName);
        console.log('File uploaded from front successfully:', data.personalFileName);

        }
        if (selectedCvFile) {
          setCvLink(data.cvFileName);
        console.log('File uploaded from front successfully:', data.cvFileName);

        }
        // console.log('File uploaded from front successfully:', data.fileName);
      })
      .catch((error) => {
        console.error('Error uploading the file:', error);
      });
};
// file upload function
// file upload function
// file upload function

    useEffect(() => {
      axios.get("https://nadim.onrender.com/aboutData/")
        .then((result) => {
          const data = result.data;
          const record = data.find(item => item._id === id);
          if (record) {
          setFirstName(record.firstName);
          setLastName(record.lastName);
          setJobTitle(record.jobTitle);
          setDateOfBirth(record.dateOfBirth);
          setAboutMe(record.aboutMe);
          setFooterAbout(record.footerAbout);
          setCvLink(record.cvLink);
          setAddress(record.address);
          setPhone(record.phone);
          setEmail(record.email);
          setLinkedin(record.linkedin);
          setYoutube(record.youtube);
          setInstagram(record.instagram);
          setWhatsapp(record.whatsapp);
          setTelegram(record.telegram);
          setPersonalImg(record.personalImg);
          setCoverImg(record.coverImg);
        }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

  const Update = (e) => {
    e.preventDefault();
    axios.put(`https://nadim.onrender.com/updatedata/${id}`, {
      firstName,
      lastName,
      jobTitle,
      dateOfBirth,
      aboutMe,
      footerAbout,
      cvLink,
      address,
      phone,
      email,
      linkedin,
      youtube,
      instagram,
      whatsapp,
      telegram,
      personalImg,
      coverImg
    })
      .then((result) => {
        console.log(result);
        navigate('/dash');
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
                        <h2 className='mb-2 text-dark'>Update data</h2>
                        <div className="mb-2">
                            <label>First Name</label>
                            <input onChange={(e)=>{setFirstName(e.target.value)}} value={firstName} type="text" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className='text-dark'>Last Name</label>
                            <input onChange={(e)=>{setLastName(e.target.value)}} value={lastName} type="text" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label className='text-dark'>Job title</label>
                            <input onChange={(e)=>{setJobTitle(e.target.value)}} value={jobTitle} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Date of birth</label>
                            <input onChange={(e)=>{setDateOfBirth(e.target.value)}} value={dateOfBirth} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>About me</label>
                            <input onChange={(e)=>{setAboutMe(e.target.value)}} value={aboutMe} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Footer resume</label>
                            <input onChange={(e)=>{setFooterAbout(e.target.value)}} value={footerAbout} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Address</label>
                            <input onChange={(e)=>{setAddress(e.target.value)}} value={address} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>phone</label>
                            <input onChange={(e)=>{setPhone(e.target.value)}} value={phone} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Email</label>
                            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Linkedin link</label>
                            <input onChange={(e)=>{setLinkedin(e.target.value)}} value={linkedin} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>YouTube link</label>
                            <input onChange={(e)=>{setYoutube(e.target.value)}} value={youtube} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Instagram link</label>
                            <input onChange={(e)=>{setInstagram(e.target.value)}} value={instagram} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>WhatsApp link</label>
                            <input onChange={(e)=>{setWhatsapp(e.target.value)}} value={whatsapp} type="text" className="form-control" />
                        </div>
                      
                        <div className="mb-2">
                            <label className='text-dark'>Telegram link</label>
                            <input onChange={(e)=>{setTelegram(e.target.value)}} value={telegram} type="text" className="form-control" />
                        </div>

                        {/* <div className="mb-2">
                            <label className='text-dark'>CV file</label>
                            <input onChange={(e)=>{setCvLink(e.target.value)}} value={cvLink} type="text" className="form-control" />
                        </div> */}
                        <br />
                        <div className="mb-2">
                          <label className='text-dark'>Choose CV File</label>
                          <input value={"The file now is: " + cvLink} type="text" className="form-control" disabled/>
                          <input className='text-dark' type="file" onChange={handleCvFileChange} />
                          <button className='text-dark' onClick={handleUpload}>Upload</button>
                        </div>
                        <br />

                        <div className="mb-2">
                          <label className='text-dark'>Choose Nice/Cover image</label>
                          <input value={"The file now is: " + coverImg} type="text" className="form-control" disabled/>
                          <input className='text-dark' type="file" onChange={handleCoverFileChange} />
                          <button className='text-dark' onClick={handleUpload}>Upload</button>
                        </div>
                        
                        <br />
                        <div className="mb-2">
                          <label className='text-dark'>Choose Personal image</label>
                          <input value={"The file now is: " + personalImg} type="text" className="form-control" disabled/>
                          <input className='text-dark' type="file" onChange={handlePersonalFileChange} />
                          <button className='text-dark' onClick={handleUpload}>Upload</button>
                        </div>


                        <button type='submit' className="btn btn-success mr-2">Update</button>
                        <button className="btn btn-primary" onClick={() => navigate('/dash')}>Cancel</button>
                    </form>    
                </div>
            </div>
    </div>
  );
};

export default EditDash;
