import { Outlet, createFileRoute } from '@tanstack/react-router'
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/_authenticated/$username/$repo/dashboard')({
  component: () => (
    <>
        <motion.div
    className=""
    initial={{ x: '100%' }}
    animate={{ x:  0  }} 
    exit={{ opacity: 0, x: -100 }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }} 
  >
          <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center pt-6">
          <Outlet />
        </div>
      </div>
  </motion.div>

    </>
  ),
})