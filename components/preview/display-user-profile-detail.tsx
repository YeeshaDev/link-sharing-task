import Image from 'next/image'

interface Profile {
  profile_picture?: string
  first_name?: string
  last_name?: string
  email?: string
}

interface DisplayUserProfileProps {
  profile: Profile
}

const DisplayUserProfile: React.FC<DisplayUserProfileProps> = ({ profile }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="border-4 rounded-full border-primary-index hover:scale[1.02] transition-all duration-300 ease-in-out">
        {profile?.profile_picture ? (
          <Image
            className="rounded-full !h-[104px] object-cover !w-[104px]"
            src={profile.profile_picture}
            alt="profile picture"
            height={104}
            width={104}
            priority
          />
        ) : (
          <div className="w-[104px] h-[104px] flex items-center justify-center">
            <div className="opacity-25">
              <Image
                className="rounded-full"
                src="/images/logo-devlinks-small.svg"
                alt="devlinks logo"
                height={40}
                width={40}
                priority
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-[90%] overflow-hidden whitespace-normal text-center">
        <h1 className="text-[32px] font-bold text-center text-neutral-dark-grey">
          {profile?.first_name} {profile?.last_name}
        </h1>
      </div>
      <a
        className="text-neutral-grey hover:text-neutral-dark-grey/50 hover:scale-105 transition-all cursor-pointer duration-300 ease-in-out"
        href={`mailto:${profile?.email}`}
      >
        {profile.email}
      </a>
    </div>
  )
}

export default DisplayUserProfile
