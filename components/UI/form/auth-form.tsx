import Button from '../button/button'
import Input from '../input/input'
import Link from 'next/link'

interface ErrorDetails {
  email?: string[]
  password?: string[]
  confirmPassword?: string[]
}

interface AuthFormState {
  errors?: ErrorDetails
}

interface AuthFormProps {
  action: (payload: FormData) => Promise<void | AuthFormState> | any
  state: AuthFormState | any
  type?: 'login' | 'register'
}

function AuthForm({ action, state, type = 'login' }: AuthFormProps) {
  if (!action) {
    throw new Error('Action is required for AuthForm component')
  }

  const registerForm = type === 'register'

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        await action(formData)
      }}
      className="flex flex-col gap-3"
    >
      <div className="relative">
        <Input
          id="email"
          name="email"
          title="Email Address"
          type="email"
          placeholder="e.g. alex@email.com"
          error={state?.errors?.email?.[0]}
        />
        {state?.errors?.email && (
          <p className="absolute top-1/2 right-1 text-error text-sm">
            {state?.errors?.email[0]}
          </p>
        )}
      </div>
      <div className="relative">
        <Input
          id="password"
          name="password"
          title={registerForm ? 'Create password' : 'Password'}
          type="password"
          placeholder={
            registerForm ? 'At least 8 characters' : 'Enter your password'
          }
          error={state?.errors?.password?.[0]}
        />
        <p className="text-sm">Password must be at least 8 characters long</p>
        {state?.errors?.password && (
          <div className="text-error">
            <p className="absolute top-[45%] right-1 text-error text-sm ">
              {state?.errors?.password[0]}
            </p>
          </div>
        )}
      </div>
      {registerForm && (
        <div className="relative">
          <Input
            id="confirm-password"
            name="confirm-password"
            title="Confirm password"
            type="password"
            placeholder="Re-enter your password"
            error={state?.errors?.confirmPassword?.[0]}
          />
          {state?.errors?.confirmPassword && (
            <p className="absolute top-1/2 right-1 text-error text-sm ">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>
      )}

      <Button style="primary" disabled={false}>
        {registerForm ? 'Create new account' : 'Login'}
      </Button>
      <div>
        <div className="text-center">
          {registerForm ? (
            <div className="flex items-center justify-center gap-x-2">
              <p className="text-sm text-neutral-grey">
                Already have an account?
              </p>
              <Link
                className="text-sm text-primary-index hover:text-primary-hover transition-colors duration-300 ease-in-out"
                href="/login"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-x-2">
              <p className="text-sm text-neutral-grey">
                Don&apos;t have an account?
              </p>
              <Link
                className="text-sm text-primary-index hover:text-primary-hover transition-colors duration-300 ease-in-out"
                href="/register"
              >
                Create account
              </Link>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}

export default AuthForm
