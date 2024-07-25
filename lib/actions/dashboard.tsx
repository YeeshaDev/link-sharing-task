// firebase
import { database, auth } from '../../firebase-config'
import { get, ref, update } from 'firebase/database'
import { User } from 'firebase/auth'
import SavedIcon from '@/components/UI/icons/saved-icon'
import toast from 'react-hot-toast'

// types for user profile and devlinks
interface UserProfile {
  name?: string
  email?: string
}

interface Devlink {
  url: string
  description?: string
}

interface UserProfileData {
  // Define profile data fields
}

// getUserProfile
export const getUserProfile = async (
  displayName: string
): Promise<UserProfile | null> => {
  try {
    const usersRef = ref(database, `/users/${displayName}`)
    const userSnapshot = await get(usersRef)

    if (userSnapshot.exists()) {
      return userSnapshot.val() as UserProfile
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null // Return null on error
  }
}

// getUserDevlinks
export const getUserDevlinks = async (): Promise<Devlink[] | null> => {
  const currentUser = auth?.currentUser as User | null
  if (!currentUser) {
    throw new Error('User not found')
  }

  const userRef = ref(database, `users/${currentUser.displayName}/devlinks`)
  try {
    const snapshot = await get(userRef)
    if (snapshot.exists()) {
      return snapshot.val() as Devlink[]
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user devlinks:', error)
    return null
  }
}

// submitUserDevLinks
export const submitUserDevLinks = async (
  devlinksList: Devlink[]
): Promise<void> => {
  const currentUser = auth?.currentUser as User | null
  if (!currentUser) {
    throw new Error('User not found')
  }

  const userRef = ref(database, `users/${currentUser.displayName}`)

  try {
    await update(userRef, {
      devlinks: devlinksList,
    })
    if (devlinksList.length > 0) {
      toast('Your changes have been successfully saved!', {
        icon: <SavedIcon />,
      })
    } else {
      toast('Dev links is cleared!', {
        icon: <SavedIcon />,
      })
    }
  } catch (error) {
    console.error('Error updating user devlinks:', error)
  }
}

// getUserProfileData
export const getUserProfileData = async (): Promise<UserProfileData | null> => {
  const currentUser = auth?.currentUser as User | null
  if (!currentUser) {
    throw new Error('User not found')
  }

  const userRef = ref(database, `users/${currentUser.displayName}/profile`)

  try {
    const snapshot = await get(userRef)
    if (snapshot.exists()) {
      return snapshot.val() as UserProfileData
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user profile data:', error)
    return null
  }
}

// submitUserProfileDatas
export const submitUserProfileDatas = async (
  profileDatas: UserProfileData
): Promise<void> => {
  const currentUser = auth?.currentUser as User | null
  if (!currentUser) {
    throw new Error('User not found')
  }

  const userRef = ref(database, `users/${currentUser.displayName}`)

  try {
    await update(userRef, {
      profile: profileDatas,
    })
    toast('Your changes have been successfully saved!', {
      icon: <SavedIcon />,
    })
  } catch (error) {
    console.error('Error updating user profile data:', error)
  }
}
