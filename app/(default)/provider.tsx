import { AuthContextProvider, RouteProtection } from '../auth-listener'

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContextProvider>
      <RouteProtection>{children}</RouteProtection>
    </AuthContextProvider>
  )
}
export default Provider
