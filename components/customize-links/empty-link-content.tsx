import Image from 'next/image'

function EmptyLinkContent() {
  return (
    <div className="w-full h-[377px] lg:h-[470px] mb-5 flex flex-col items-center justify-center gap-10 px-4 py-14 rounded-xl bg-neutral-light-grey">
      <Image
        src="/images/illustration-empty.svg"
        alt="empt illustration"
        width={250}
        height={160}
      />
      <div className="text-center flex flex-col gap-5 md:w-[488px]">
        <h3 className={`text-neutral-dark-grey text-2xl font-bold`}>
          Let&apos;s get you started
        </h3>
        <p className={`text-neutral-grey`}>
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We&apos;re here to help you
          share your profiles with everyone!
        </p>
      </div>
    </div>
  )
}

export default EmptyLinkContent
