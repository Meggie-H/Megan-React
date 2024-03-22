import Dashboard from './components/Dashboard';
import UserForm from './components/UserForm';

function App() {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <UserForm />
      </div>
      <Dashboard />
    </>
  );
}
export default App;
