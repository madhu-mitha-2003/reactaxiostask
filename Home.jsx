import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {



  return (
    <div>
        <div className='container text-center'>
            <div className='mt-5 p-5 shadow bg-success-subtle'>
            <div className='h2'>Welcome To User Management System</div>
            <div className='mt-5'>
                <Link to={'/newuser'}><button className='btn btn-primary'>Add New User</button></Link> &nbsp;
                <Link to={'/users'}><button className='btn btn-primary'>View Users Data</button></Link>
            </div>
            </div>
        </div>
    
    </div>
  )
}

export default Home