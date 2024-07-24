import React, { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <main className="box-border w-full bg-white">{children}</main>
}

export default Main
