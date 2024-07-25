import { useEffect, useState } from 'react'
import Input from '../UI/input/input'
import { useUserProfileContext } from '@/context/user-profile-context'
import { ErrorObject, UserProfile } from '@/lib/types/userProfile'

export default function ProfileInputGroup() {
  const {
    userObject,
    handleFieldEdit,
    handleUserInputs,
    errorObject,
    handleError,
  } = useUserProfileContext()

  const [firstName, setFirstName] = useState<string>(
    userObject.first_name || ''
  )
  const [lastName, setLastName] = useState<string>(userObject.last_name || '')
  const [email, setEmail] = useState<string>(userObject.email || '')
  const [error, setError] = useState<ErrorObject>(errorObject)
  const [isFieldDirty, setIsFieldDirty] = useState<boolean>(false)

  useEffect(() => {
    setFirstName(userObject.first_name || '')
    setLastName(userObject.last_name || '')
    setEmail(userObject.email || '')
  }, [userObject])

  useEffect(() => {
    handleFieldEdit(isFieldDirty)
  }, [isFieldDirty, firstName, lastName, email])

  useEffect(() => {
    handleError(error)
  }, [error])

  useEffect(() => {
    setError(errorObject)
  }, [errorObject])

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement
    setError((prevError) => ({
      ...prevError,
      [name]: { status: false, message: '' },
    }))
    setIsFieldDirty(true)
    if (name === 'first_name') {
      setFirstName(value)
    } else if (name === 'last_name') {
      setLastName(value)
    } else if (name === 'email') {
      setEmail(value)
    }
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value
    const field = event.target.name as keyof UserProfile
    if (value?.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        [field]: {
          status: true,
          message: "Can't be empty",
        },
      }))
      return
    } else if (field === 'email' && !value.includes('@')) {
      setError((prevError) => ({
        ...prevError,
        [field]: {
          status: true,
          message: 'Invalid email address',
        },
      }))
      return
    }

    handleUserInputs(field, value)
  }

  return (
    <div className="px-6 py-2 flex flex-col bg-neutral-light-grey rounded-xl">
      <Input
        id={'first-name'}
        name={'first_name'}
        title={'First name*'}
        placeholder={'Ben'}
        hasIcon={false}
        value={firstName}
        onChange={handleChanges}
        onBlur={handleInputBlur}
        error={error['first_name']?.status}
        errorMessage={error['first_name']?.message}
        profile
      />
      <Input
        id={'last-name'}
        name={'last_name'}
        title={'Last name*'}
        placeholder={'Wright'}
        hasIcon={false}
        value={lastName}
        onChange={handleChanges}
        onBlur={handleInputBlur}
        error={error['last_name']?.status}
        errorMessage={error['last_name']?.message}
        profile
      />
      <Input
        id={'email'}
        name={'email'}
        title={'Email'}
        placeholder={'ben@example.com'}
        hasIcon={false}
        value={email}
        onChange={handleChanges}
        onBlur={handleInputBlur}
        error={error['email']?.status}
        errorMessage={error['email']?.message}
        profile
      />
    </div>
  )
}
