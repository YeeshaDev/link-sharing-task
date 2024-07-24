import { DevlinksProvider } from '@/context/devlink-context'
import { AuthContextProvider, RouteProtection } from '../auth-listener'
import UserProfileProvider from '@/context/user-profile-context'

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContextProvider>
      <RouteProtection>
        <DevlinksProvider>
          <UserProfileProvider>{children}</UserProfileProvider>
        </DevlinksProvider>
      </RouteProtection>
    </AuthContextProvider>
  )
}
export default Provider
