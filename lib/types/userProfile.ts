export interface UserObject {
  first_name?: string
  last_name?: string
  email?: string
}

export interface ErrorObject {
  [key: string]: {
    status: boolean
    message: string
  }
}

export interface AuthFormState {
  errors?: Record<string, string[]>
}

export interface UserProfile {
  first_name: string
  last_name: string
  email: string
  profile_picture?: string
}

export interface UserProfileContext {
  userObject: UserObject
  handleFieldEdit: (isDirty: boolean) => void
  handleUserInputs: (field: string, value: string) => void
  errorObject: ErrorObject
  handleError: (error: ErrorObject) => void
}
