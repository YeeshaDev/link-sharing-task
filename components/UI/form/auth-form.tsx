import Button from "../button/button";
import Input from "../input/input";
import Link from "next/link";

interface ErrorDetails {
  email?: string;
  password?: string[];
  confirmPassword?: string;
}

interface AuthFormState {
  errors?: ErrorDetails;
}

interface AuthFormProps {
  action: string;
  state: AuthFormState;
  type?: "login" | "register";
}

function AuthForm({ action, state, type = "login" }: AuthFormProps) {
  if (!action) {
    throw new Error("Action is required for AuthForm component");
  }

  const registerForm = type === "register";

  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
        <Input
          id="email"
          name="email"
          title="Email Address"
          type="email"
          placeholder="e.g. alex@email.com"
          error={state?.errors?.email}
        />
        {state?.errors?.email && (
          <p className="text-error text-sm italic">{state.errors.email}</p>
        )}
      </div>
      <div>
        <Input
          id="password"
          name="password"
          title={registerForm ? "Create password" : "Password"}
          type="password"
          placeholder={
            registerForm ? "At least 8 characters" : "Enter your password"
          }
          error={state?.errors?.password}
        />
        {state?.errors?.password && (
          <div className="text-error">
            <p className="text-sm italic">Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li className="text-xs" key={error}>
                  - {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {registerForm && (
        <div>
          <Input
            id="confirm-password"
            name="confirm-password"
            title="Confirm password"
            type="password"
            placeholder="Re-enter your password"
            error={state?.errors?.confirmPassword}
          />
          {state?.errors?.confirmPassword && (
            <p className="text-error text-sm italic">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>
      )}

      <Button style="primary" disabled={false}>
        {registerForm ? "Create new account" : "Login"}
      </Button>
      <div>
        <div className="text-center">
          {registerForm ? (
            <>
              <p className="text-sm text-neutral-grey">
                Already have an account?
              </p>
              <Link
                className="text-sm text-primary-index hover:text-primary-hover transition-colors duration-300 ease-in-out"
                href="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-neutral-grey">
                Don&apos;t have an account?
              </p>
              <Link
                className="text-sm text-primary-index hover:text-primary-hover transition-colors duration-300 ease-in-out"
                href="/register"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default AuthForm;
