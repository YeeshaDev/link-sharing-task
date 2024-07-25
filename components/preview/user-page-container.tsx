import { getUserProfile } from '@/lib/actions/dashboard'
import DisplayUserProfile from './display-user-profile-detail'
import DisplayDevlinkList from './display-devlink-list'
import { notFound } from 'next/navigation'

interface Profile {
  profile_picture?: string
  first_name?: string
  last_name?: string
  email?: string
}

interface DevLink {
  id: string
  platform: string
  link: string
}

interface UserData {
  profile: Profile
  devlinks: DevLink[]
}

interface UserPageContainerProps {
  displayName: string
}

export default async function UserPageContainer({
  displayName,
}: UserPageContainerProps) {
  const userData: UserData | any = await getUserProfile(displayName)

  if (!userData) {
    notFound()
    return null
  }

  return (
    <div className="mt-12 gap-14 pb-20 md:pb-10">
      <DisplayUserProfile profile={userData.profile} />
      {userData?.devlinks?.length > 0 ? (
        <DisplayDevlinkList devlinks={userData.devlinks} />
      ) : (
        <div className="text-center">
          <p className="text-neutral-grey">There are no links yet.</p>
        </div>
      )}
    </div>
  )
}
