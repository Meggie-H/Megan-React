import { Outlet, createFileRoute } from '@tanstack/react-router';
import Navbar from '../components/Navbar';

export const Route = createFileRoute('/$username/$repo/dashboard')({
  component: () => (
    <>
    <Navbar />
    <div className="bg-gray-950 flex justify-center items-center pt-6">
      <Outlet />
    </div>
    </>
  ),
});