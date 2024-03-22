import { useForm } from '@tanstack/react-form'
import { getUser } from '../services/apiService'
import { useQuery } from '@tanstack/react-query'

const UserForm = () => {
  const form = useForm({
    defaultValues: {
      userName: '',
    },
    onSubmit: async ({ value }) => {
      // Set state
      console.log(value)
    },
  })

  return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="userName"
            validators={{
              onChangeAsyncDebounceMs: 500,
              onChange: ({ value }) =>
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
              <>
                <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              ) : null}
              </>      
            )}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
  )
}

export default UserForm;