import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NewUser, { loader as userLoader } from './pages/NewUser';
import Users from './pages/Users';
import Home from './pages/Home';
import './App.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'newuser',
    element: <NewUser />,
    loader: userLoader
  },
  {
    path: 'users',
    element: <Users />,
    loader: userLoader
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App