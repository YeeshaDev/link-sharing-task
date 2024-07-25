import toast from 'react-hot-toast'

export const handleFirebaseAuthErrors = (error) => {
  const code = error.code
  let message
  switch (code) {
    case 'auth/weak-password':
      message = 'Password is too weak. Please choose a stronger password.'
      break
    case 'auth/email-already-exists':
      message = 'Email already exists. Please try a different email address.'
      break
    case 'auth/invalid-creation-time':
      message = 'Invalid creation time. Please try again.'
      break
    case 'auth/invalid-credential':
      message = 'Invalid credential. Please try again.'
      break
    case 'auth/invalid-email':
      message = 'Invalid email address. Please enter a valid email address.'
      break
    case 'auth/invalid-password':
      message = 'Invalid password. Please try again.'
      break
    case 'auth/invalid-password-salt':
      message = 'Invalid password salt. Please try again.'
      break
    case 'auth/too-many-requests':
      message = 'Too many requests. Please try again later.'
      break
    case 'auth/user-not-found':
      message = 'User not found. Please try again.'
      break
    case 'auth/email-already-in-use':
      message = 'Email already in use. Please try a different email address.'
      break
    case 'auth/invalid-email':
      message = 'Invalid email address. Please enter a valid email address.'
      break
    default:
      message = error?.message
  }

  toast.error(message)
}
