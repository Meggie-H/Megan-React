import { Link } from '@tanstack/react-router';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div className='bg-950 h-screen w-screen text-gray-200 flex flex-col justify-center items-center'>
            <h1 className='text-8xl'>404</h1>
            <h2 className='text-2xl m-2'>Page not found</h2>
            <h3 className='text-md'>We can not seem to find the page you are looking for</h3>
            <Link to='/' className='text-blue-500 mt-4'>Go back to login</Link>
        </div>
    )
}

export default NotFoundPage;