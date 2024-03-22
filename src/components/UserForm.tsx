import { useForm } from '@tanstack/react-form'
import { getUser } from '../services/apiService'

const UserForm = () => {
  const form = useForm({
    defaultValues: {
      userName: '',
    },
    onSubmit: async ({ value }) => {
      // Set state
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className='flex flex-col bg-black items-center justify-evenly w-full h-full p-8 lg:w-1/3 lg:h-1/2 lg:rounded-2xl'
    >
      <div>
        <img className="w-24 h-24" src="https://assets-global.website-files.com/61d1b6e84887f53fef1dcdf2/631b45e07d98cfb364e5951f_github-white.png" />
        <h1 className='text-white text-center mt-1 text-3xl'>GitGo</h1>
      </div>

      <div className='w-full'>
        <h2 className="text-md item-left mb-1">Enter you Github username:</h2>
        <div className="mb-4 w-full">
          <form.Field
            name="userName"
            validators={{
              onChangeAsyncDebounceMs: 500,
              onSubmit: ({ value }) =>
                !value ? 'A username is required' : undefined,
              onChangeAsync: async ({ value }) => {
                try {
                  await getUser(value);
                  return undefined; 
                } catch (error) {
                  return 'No such username exists';
                }
              },
            }}
            children={(field) => (
              <div className='flex flex-col'>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border border-gray-800  bg-gray-900 rounded-md p-4 focus:outline-none focus:ring focus:ring-blue-300"
                />
                {field.state.meta.errors ? (
                  <em className="text-purple-500" role="alert">{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </div>      
            )}
          />
        </div>
        <button type="submit" className="bg-blue-400 w-full text-white py-4 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Get your stats
        </button>
      </div>
    </form>
  )
}

export default UserForm;