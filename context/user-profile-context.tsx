'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FormEvent,
} from 'react'
import { auth, storage } from '@/firebase-config'
import {
  getUserProfileData,
  submitUserProfileDatas,
} from '@/lib/actions/dashboard'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

interface UserProfile {
  first_name: string
  last_name: string
  email: string
  profile_picture: string | null
}

interface ErrorField {
  [key: string]: {
    status: boolean
    message: string
  }
}

interface UserProfileData {
  first_name: string
  last_name: string
  email: string
  profile_picture?: string
}

interface UserProfileContextProps {
  userProfilePicMockup: string | null
  userObject: UserProfile
  errorObject: ErrorField
  hasError: boolean
  handleError: (error: ErrorField) => void
  loading: boolean
  handleUserProfilePicMockup: (imageURL: string) => void
  handleFieldEdit: (value: boolean) => void
  buttonDisabled: boolean
  userProfilePicURL: string | null
  handleUserProfilePic: (imageFile: File) => void
  handleUserInputs: (name: keyof UserProfile, value: string) => void
  handleSubmit: (event: FormEvent) => Promise<void>
}

const UserProfileContext = createContext<UserProfileContextProps | undefined>(
  undefined
)

export const useUserProfileContext = (): UserProfileContextProps => {
  const context = useContext(UserProfileContext)
  if (!context) {
    throw new Error(
      'useUserProfileContext must be used within a UserProfileProvider'
    )
  }
  return context
}

interface UserProfileProviderProps {
  children: ReactNode
}

const UserProfileProvider: React.FC<UserProfileProviderProps> = ({
  children,
}) => {
  const [userObject, setUserObject] = useState<UserProfile>({
    first_name: '',
    last_name: '',
    email: '',
    profile_picture: null,
  })
  const [userProfilePicFile, setUserProfilePicFile] = useState<File | null>(
    null
  )
  const [userProfilePicURL, setUserProfilePicURL] = useState<string | null>(
    null
  )
  const [userProfilePicMockup, setUserProfilePicMockup] = useState<
    string | null
  >(null)
  const [hasAnyChanges, setHasAnyChanges] = useState<boolean>(false)
  const [errorObject, setErrorObject] = useState<ErrorField>({})
  const [hasError, setHasError] = useState<boolean>(false)
  const [imageProcessLoading, setImageProcessLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  const handleUserProfilePicMockup = (imageURL: string) => {
    setUserProfilePicMockup(imageURL)
  }

  const handleUserProfilePic = (imageFile: File) => {
    setHasAnyChanges(true)
    setUserProfilePicFile(imageFile)
  }

  const postUserProfilePicFileIntoStorage = async (
    picFile: File
  ): Promise<string | null> => {
    const currentUser = auth?.currentUser
    if (!currentUser) {
      throw new Error('User not found')
    }

    setImageProcessLoading(true)
    const storageRef = ref(storage, `users/${currentUser.uid}/profile_picture`)

    try {
      const uploadTask = uploadBytesResumable(storageRef, picFile)
      const snapshot = await uploadTask
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    } catch (error) {
      console.error('Image cannot be uploaded!', error)
      return null
    } finally {
      setImageProcessLoading(false)
    }
  }

  const handleFieldEdit = (value: boolean) => {
    setHasAnyChanges(value)
  }

  const handleError = (error: ErrorField) => {
    setErrorObject(error)
  }

  const handleUserInputs = (name: keyof UserProfile, value: string) => {
    setUserObject((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (hasError) return

    const updatedErrorObject: ErrorField = {}

    if (userObject.first_name.trim() === '') {
      updatedErrorObject.first_name = {
        status: true,
        message: "Can't be empty",
      }
    }

    if (userObject.last_name.trim() === '') {
      updatedErrorObject.last_name = { status: true, message: "Can't be empty" }
    }

    if (Object.keys(updatedErrorObject).length > 0) {
      setErrorObject(updatedErrorObject)
      return
    }

    setLoading(true)

    if (userProfilePicFile) {
      const picURL = await postUserProfilePicFileIntoStorage(userProfilePicFile)
      setUserProfilePicURL(picURL)
      setUserObject((prev) => ({ ...prev, profile_picture: picURL }))

      await submitUserProfileDatas({ ...userObject, profile_picture: picURL })
    } else {
      await submitUserProfileDatas(userObject)
    }

    setHasAnyChanges(false)
    setLoading(false)
  }

  useEffect(() => {
    const hasError = Object.values(errorObject).some((error) => error.status)
    setHasError(hasError)
  }, [errorObject])

  useEffect(() => {
    setLoading(true)
    getUserProfileData()
      .then((userData: UserProfileData | any) => {
        const convertedData: UserProfile = {
          ...userData,
          profile_picture: userData?.profile_picture || null,
        }
        setUserObject(convertedData)
        setUserProfilePicURL(userData.profile_picture || null)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.error(error.message)
      })
  }, [])

  useEffect(() => {
    if (hasAnyChanges && !hasError && !loading && !imageProcessLoading) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [hasAnyChanges, hasError, errorObject, loading, imageProcessLoading])

  const values: UserProfileContextProps = {
    userProfilePicMockup,
    userObject,
    errorObject,
    hasError,
    handleError,
    loading,
    handleUserProfilePicMockup,
    handleFieldEdit,
    buttonDisabled,
    userProfilePicURL,
    handleUserProfilePic,
    handleUserInputs,
    handleSubmit,
  }

  return (
    <UserProfileContext.Provider value={values}>
      {children}
    </UserProfileContext.Provider>
  )
}

export default UserProfileProvider
