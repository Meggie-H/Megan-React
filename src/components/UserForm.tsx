import { useForm } from '@tanstack/react-form';
import { getUser } from '../services/UserAPI';
import { useNavigate } from "@tanstack/react-router";

const UserForm = () => {
const navigate = useNavigate({ from: '/' });
  const form = useForm({
    defaultValues: {
      userName: '',
    },
    onSubmit: async ({ value }) => {
      navigate({ to: `${value.userName}/repos` });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="flex h-full w-full flex-col items-center justify-evenly bg-black p-8 lg:h-1/2 lg:w-1/3 lg:rounded-2xl"
    >
      <div>
        <img
          className="h-24 w-24"
          src="https://assets-global.website-files.com/61d1b6e84887f53fef1dcdf2/631b45e07d98cfb364e5951f_github-white.png"
        />
        <h1 className="mt-1 text-center text-3xl text-white">GitGo</h1>
      </div>

      <div className="w-full">
        <h2 className="text-md item-left mb-1">Enter you Github username:</h2>
        <div className="mb-4 w-full">
          <form.Field
            name="userName"
            validators={{
              onChangeAsyncDebounceMs: 300,
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
              <div className="flex flex-col">
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="rounded-md border border-gray-800 bg-gray-900 p-4 focus:outline-none focus:ring focus:ring-blue-300"
                />
                {field.state.meta.errors ? (
                  <em className="text-purple-500" role="alert">
                    {field.state.meta.errors.join(', ')}
                  </em>
                ) : null}
              </div>
            )}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-400 px-4 py-4 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
        Get your stats
        </button>
      </div>
    </form>
  );
};

export default UserForm;
