import React from 'react';
import SelectButton from './SelectButton';
import GitTable from './GitTable';

const Dashboard = () => {
  return (
    <div className="bg-gray-950">
      <SelectButton />
      <div className="flex items-center justify-center">
        <GitTable />
      </div>
    </div>
  );
};

export default Dashboard;
