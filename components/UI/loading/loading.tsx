import Image from 'next/image'

function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="animate-pulse">
        <Image
          src="/images/logo-devlinks-small.svg"
          alt="loading"
          width={62}
          height={62}
        />
      </div>
    </div>
  )
}

export default Loading
