import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'


const Users = () => {

    const {users} = useLoaderData(); // getting user details from loader function
    const [usersData, setUsersData] = useState(users); // default users data
    const [editingUserId, setEditingUserId] = useState(null);

    const [updatedName, setUpdatedName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedPhone, setUpdatedPhone] = useState("");

    
    // to display user edit option
    const editUser = (user) => {

        setEditingUserId(user.id);
        setUpdatedName(user.name);
        setUpdatedEmail(user.email);
        setUpdatedPhone(user.phone);

    }


    // submit edited user data request
    const handleUpdate = (id, updatedData) => {
        // axios edit(put) request
        axios.put(`https://668a5df82c68eaf3211c9bc7.mockapi.io/users/${id}`, updatedData)
        // local update
        .then((response) => 
            { const updatedUser = response.data; 
                setUsersData((prevData) => prevData.map((user) => (user.id === id ? updatedUser : user)))})
      };



    // user data submission request
    const submitEditedUser = (e) => {

        if (editingUserId) {
            handleUpdate(editingUserId, {
              name: updatedName,
              email: updatedEmail,
              phone: updatedPhone,
            });
            setEditingUserId(null);
          }

    }   




    // to delete the user data
    const deleteUser = async (id) => {
        
        const confirmDel = confirm('Are you sure to delete the user ?') // to get confirmation from user side to proceed delete request

        confirmDel 
        // axios delete request
        && await axios.delete(`https://668a5df82c68eaf3211c9bc7.mockapi.io/users/${id}`)
        // local update
        && setUsersData((prevData) => prevData.filter((user) => user.id !== id))

        confirmDel ? alert('User Deleted Succesfully') : alert('User Not Deleted')

        
    }

  return (
    <div className='container'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5 p-4 shadow bg-info-subtle">
            <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active fs-5 fw-bold" aria-current="page" to={'/'} >Home</Link>
                        <Link className="nav-link fs-5 fw-semibold" to={'/newuser'}>Create New User</Link>
                        <Link className="nav-link fs-5 fw-semibold" to={'/users'}>View Users Data</Link>
                    </div>
                </div>
            </div>
        </nav>
        <table className='table table-striped col-12 col-md-6 col-lg-3'>
            <thead>
                <tr className='table-dark'>
                    <th>S. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {   // converting users data into tables
                    usersData.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{editingUserId === user.id ? (<input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)}/>) : (user.name)}</td>
                            <td>{editingUserId === user.id ? (<input type="text" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)}/>) : (user.email)}</td>
                            <td>{editingUserId === user.id ? (<input type="text" value={updatedPhone} onChange={(e) => setUpdatedPhone(e.target.value)}/>) : (user.phone)}</td>
                            <td>
                                { editingUserId === user.id ? (<button className='btn btn-success m-1' onClick={() => submitEditedUser(user)}>Update</button>) : (<><button className='btn btn-warning m-1' onClick={() => editUser(user)}>Edit</button>
                                <button className='btn btn-danger m-1' onClick={() => deleteUser(user.id)}>Delete</button></>)}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Users