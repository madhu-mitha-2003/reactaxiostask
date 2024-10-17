import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom';


export const loader =  async() => {
    // requesting users data using axios 'get' request
    const getUsers = await axios.get('https://668a5df82c68eaf3211c9bc7.mockapi.io/users');

    return {users: getUsers.data}
}


const NewUser = () => {

    const {users: initialUsers} = useLoaderData();  // using the users data we got from loader function
    const [usersData, setUsersData] = useState([initialUsers]); // setting users data as default data
    const [newName, setNewname] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [button, setButton] = useState('Add User')

    
    // to create new user data from form sumbit function
    const handleSubmit = async(e) => {

        e.preventDefault();

        if (button === 'Add User') {
            
            let newUser = {
                name: newName,
                email: newEmail,
                phone: newPhone
            }
            // axios post request (adding new data to exisiting data)
            const response = await axios.post('https://668a5df82c68eaf3211c9bc7.mockapi.io/users', newUser);
            // local update
            response.data && setUsersData({...usersData, newUser});
    
            alert('User Added Successfully');
    
            setNewname('');
            setNewEmail('');
            setNewPhone('')
        }
        
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
        <form className='border p-3 col-12 col-md-6 col-lg-12 shadow bg-info-subtle' onSubmit={handleSubmit}>
           <div>
                <label className='form-label fw-semibold'>Name : &nbsp; </label>
                <input type="text" className='form-control'  value={newName} placeholder='Enter Fullname' onChange={(e) => setNewname(e.target.value)}/>
           </div><br/>
           <div>
                <label className='form-label fw-semibold'>Email : &nbsp; </label>
                <input type="email" className='form-control' value={newEmail} placeholder='Enter Email Address' onChange={(e) => setNewEmail(e.target.value)}/>
           </div><br/>
           <div>
                <label className='form-label fw-semibold'>Phone No. : &nbsp; </label>
                <input type="text" className='form-control' value={newPhone} placeholder='Enter Phone No.' onChange={(e) => setNewPhone(e.target.value)}/>
           </div><br/>
           <div>
                <button type='submit' disabled={newName === '' || newEmail === '' || newPhone === ''} className='btn btn-primary'>{ button }</button> &nbsp;
           </div>
        </form><br /> <br/> 
        
    </div>
  )
}

export default NewUser