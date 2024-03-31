import { createFileRoute } from '@tanstack/react-router';
import PickRepoList from '../../pages/PickRepoList';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/_authenticated/$username/repos')({
  component: () => (
    <motion.div
      className=""
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <PickRepoList />
    </motion.div>
  ),
});
