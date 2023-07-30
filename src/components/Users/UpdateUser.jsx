import { useEffect, useState } from "react"
import React from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"


function UpdateUser(){
    const {id} = useParams()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate()
    
    useEffect(()=>{
        axios.get('https://nadim.onrender.com/getUser/' + id)
        .then((result)=>{
            console.log(result);
            setName(result.data.name)
            setEmail(result.data.email)
            setAge(result.data.age)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])
    
    const Update = (e)=>{
        e.preventDefault();
        axios.put("https://nadim.onrender.com/updateUser/" + id, {name, email, age})
        .then((result)=>{
            console.log(result);
            navigate('/');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handelCancel = () => {
        navigate('/')
    }

    return(
        <>
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="bg-white rounded p-3" style={{width: '60%'}}> 
                    <form onSubmit={Update}>
                        <h2>Update User</h2>
                        <div className="mb-2">
                            <label htmlFor="">Name</label>
                            <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder="Enter Name" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Email</label>
                            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="text" placeholder="Enter Email" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Age</label>
                            <input onChange={(e)=>{setAge(e.target.value)}} value={age} type="text" placeholder="Enter Age" className="form-control" />
                        </div>
                        <button className="btn btn-success mr-2">Update</button>
                        <button onClick={()=>{handelCancel()}} className="btn btn-primary">Cancel</button>
                    </form>    
                </div>
            </div>
        </>
    )
}

export default UpdateUser;