'use client'
import { useDevlinksContext } from '@/context/devlink-context'
import Image from 'next/image'
import DevLink from '../customize-links/dev-link'
import { useUserProfileContext } from '@/context/user-profile-context'
import { usePathname } from 'next/navigation'

function PhoneMockup() {
  const { devlinksList } = useDevlinksContext()
  const { userObject, userProfilePicMockup, userProfilePicURL } =
    useUserProfileContext()

  const pathname = usePathname()

  return (
    <>
      <div className="w-[307px] h-[631px] relative">
        <Image
          src={'/images/illustration-phone-mockup.svg'}
          alt="Phone mockup illustration"
          width={307}
          height={631}
          priority
        />
        <div className="absolute top-16 flex flex-col items-center justify-center w-full ">
          {userProfilePicMockup || userObject?.profile_picture ? (
            <div className="h-[96px] w-[96px]">
              {!userProfilePicURL ? (
                <Image
                  src={'/images/illustration-phone-mockup.svg'}
                  alt="User's profile photo"
                  width={96}
                  height={96}
                  className="h-[96px] w-[96px] rounded-full border-4 object-cover border-primary-index duration-200 hover:scale-[1.02]"
                />
              ) : (
                <Image
                  src={userProfilePicURL}
                  alt="User's photo preview"
                  width={96}
                  height={96}
                  className="!h-[96px] bg-black/20 !w-[96px] rounded-full border-4 border-primary-index duration-200 hover:scale-[1.01] object-cover"
                />
              )}
            </div>
          ) : (
            ''
          )}

          {userObject?.first_name ||
          userObject?.last_name ||
          userObject.email ? (
            <>
              <p className="text-neutral-dark-grey text-center font-semibold text-lg w-[90%] mt-5 bg-white overflow-hidden">
                {userObject?.first_name} {userObject.last_name}
              </p>
              <a
                href={`mailto:${userObject?.email}`}
                className="text-sm text-neutral-grey text-center w-[90%] bg-white overflow-hidden hover:text-neutral-dark-grey/50 transition-colors cursor-pointer duration-300 ease-in-out"
              >
                {userObject?.email}
              </a>
            </>
          ) : (
            ''
          )}
        </div>
        <div className="flex items-center justify-center">
          <ul
            className={`absolute top-[17.3rem] w-[90%] max-h-[320px] flex flex-col items-center overflow-auto bg-white rounded-b-3xl ${
              pathname === '/profile-details' ? 'h-[320px]' : ''
            }`}
          >
            {devlinksList?.map((link: any) => (
              <DevLink key={link?.id} link={link} mockup />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default PhoneMockup
