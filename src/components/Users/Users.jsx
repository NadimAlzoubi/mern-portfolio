import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import axios from "axios";

function Users(){
    const [users, setUsers] = useState([])
    useEffect(()=>{
        axios.get('https://nadim.onrender.com/')
        .then((result)=>{
            setUsers(result.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    const handleDelete = (id) => {
        window.location.reload();
        axios.delete('https://nadim.onrender.com/deleteUser/' + id)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

    return(
        <>
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="w-70 bg-white rounded p-3">
                    <Link to="/create" className="btn btn-success">Add +</Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Age</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => {
                                    return(
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.age}</td>
                                            <td>
                                                <Link to={`/update/${user._id}`} className="btn btn-warning">Edit</Link>
                                                <Link to={`/delete/${user._id}`} onClick={(e) => {handleDelete(user._id)}} className="btn btn-danger">Delete</Link>
                                            </td>
                                        </tr>
                                    )
                                }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Users;