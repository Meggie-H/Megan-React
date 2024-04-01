import { Link } from '@tanstack/react-router';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="bg-950 flex h-screen w-screen flex-col items-center justify-center text-gray-200">
      <h1 className="text-8xl">404</h1>
      <h2 className="m-2 text-2xl">Page not found</h2>
      <h3 className="text-md">
        We can not seem to find the page you are looking for
      </h3>
      <Link to="/" className="mt-4 text-blue-500">
        Go back to login
      </Link>
    </div>
  );
};

export default NotFoundPage;
