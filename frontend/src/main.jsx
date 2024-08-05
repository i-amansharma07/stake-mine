import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Admin from './Admin.jsx';



const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
    path : '/admin',
    element : <Admin />
    }
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
