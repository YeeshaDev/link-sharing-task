import { auth } from '@/firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth'
import { redirect } from 'next/navigation'
import { SigninFormSchema, SignupFormSchema } from '../formValidationSchema'
import toast from 'react-hot-toast'
import { ref, set } from 'firebase/database'
import { database } from '@/firebase-config'
import { handleFirebaseAuthErrors } from '../utils/handle-firebase-errors'
import { generateId } from '../utils/helpers'
import { AuthFormState } from '../types/userProfile'

// Define the type for initial profile data
interface InitialProfileData {
  profile: {
    profile_picture: string
    first_name: string
    last_name: string
    email: string
  }
}

export const writeInitialUserData = async (id: string): Promise<void> => {
  const initialProfileData: InitialProfileData = {
    profile: {
      profile_picture: '',
      first_name: '',
      last_name: '',
      email: '',
    },
  }

  try {
    await set(ref(database, `users/${id}`), initialProfileData)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

// Define the type for FormData
interface FormData {
  get(name: string): FormDataEntryValue | null
}

// Update signup function
export const signup = async (
  state: AuthFormState | any,
  formData: FormData
): Promise<void | AuthFormState> => {
  const id = generateId(6)

  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    if (user) {
      await updateProfile(user, {
        displayName: id,
      })

      await writeInitialUserData(id)

      toast.success('Account created successfully!')
    }
  } catch (error) {
    handleFirebaseAuthErrors(error)
    return {
      errors: { general: ['Failed to create account'] },
    }
  } finally {
    redirect('/customize-links')
  }
}

// Signin
export const signin = async (
  state: unknown,
  formData: FormData
): Promise<{ errors?: Record<string, string[]> } | void> => {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    if (user) {
      toast.success('Login successful!')
    }
  } catch (error) {
    handleFirebaseAuthErrors(error)
    return {
      errors: { general: ['Failed to login'] },
    }
  } finally {
    redirect('/customize-links')
  }
}

// Logout function
export function logout(): void {
  signOut(auth).catch((error) => {
    console.error('Failed to log out:', error)
  })
}
