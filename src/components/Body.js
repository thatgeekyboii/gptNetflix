import React from 'react';
import Browse from '../components/Browse.js';
import Login from '../components/Login.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Body = () => {

    const appRouter = createBrowserRouter([
        {
        path: '/',
        element: <Login/>
        },
        {
            path: '/browse',
            element: <Browse />
        }
    ])
    return (
        <div>
            <RouterProvider router = {appRouter}> 

            </RouterProvider>
        </div>
    )
};
export default Body;