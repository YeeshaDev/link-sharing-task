import Link from 'next/link'

function NotFound() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl text-neutral-dark-grey font-bold uppercase">
        User <span className="text-primary-index">not</span> found !
      </h1>
      <p className="text-neutral-grey text-center m-5 mx-10">
        The user you are looking for does not exist. Please make sure the
        username is correct.
      </p>
      <p className="bg-neutral-borders w-full text-center text-primary-index uppercase font-extrabold">
        or
      </p>
      <div className="flex flex-col gap-2 items-center m-5">
        <Link
          href="/register"
          className="text-primary-index hover:text-primary-hover"
        >
          Create an account
        </Link>
        <div className="text-center">
          <p className="text-neutral-grey">Already have an account?</p>
          <Link
            href="/login"
            className="text-primary-index hover:text-primary-hover"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
