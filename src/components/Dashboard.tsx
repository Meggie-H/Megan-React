import SelectButton from './SelectButton';
import GitTable from './GitTable';

const Dashboard = () => {
  return (
    <div className="bg-gray-950">
      <SelectButton />
      <div className='flex justify-center items-center'>
        <GitTable />
      </div>
    </div>
  );
};

export default Dashboard;
