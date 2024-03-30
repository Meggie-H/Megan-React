import React from 'react'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import Navbar from '../components/Navbar';

export const Route = createFileRoute('/$username/$repo/dashboard')({
  component: () => (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-950 pt-6">
        <Outlet />
      </div>
    </>
  ),
});