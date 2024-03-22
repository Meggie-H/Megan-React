import Dashboard from './components/Dashboard'
import UserForm from './components/UserForm';

function App() {
  return (
    <>
      <div className='h-screen w-screen flex items-center justify-center'>
        <UserForm/>
      </div>
      <Dashboard />
    </>
  );
}
 export default App;