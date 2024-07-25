import { AuthRouteProtection } from '../auth-listener'

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthRouteProtection>{children}</AuthRouteProtection>
}

export default Provider
