import HeadingGroup from '@/components/UI/heading/heading-group'
import LoginForm from './login-form'

async function LoginPage() {
  return (
    <div className="flex flex-col gap-5 px-8 pt-14 md:py-10 md:w-[476px] md:px-10">
      <HeadingGroup
        title="Login"
        subtitle="Add your details below to get back into the app"
      />
      <LoginForm />
    </div>
  )
}

export default LoginPage
