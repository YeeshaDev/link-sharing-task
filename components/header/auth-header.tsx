import Image from 'next/image'
import Link from 'next/link'

function AuthHeader() {
  return (
    <header className="box-border flex items-center justify-center mx-auto w-full pt-8 pb-6 sm:pb-4 px-6  md:mb-8">
      <Link href="/">
        <Image
          width={100}
          height={100}
          className="w-[130px] mx-auto md:w-[182.5px] md:h-[40px]"
          src={'/images/logo-devlinks-large.svg'}
          alt="devlinks logo"
          priority
        />
      </Link>
    </header>
  )
}

export default AuthHeader
