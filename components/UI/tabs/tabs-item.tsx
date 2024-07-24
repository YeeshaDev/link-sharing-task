'use client'

import Link from 'next/link'
import { createContext, useContext, ReactNode } from 'react'

// Define the context type
const TabsItemContext = createContext<string | undefined>(undefined)

// Define the hook to use the context
export function useTabsItemContext() {
  const ctx = useContext(TabsItemContext)

  if (ctx === undefined) {
    throw new Error(
      'useTabsItemContext must be used within a TabsItem component'
    )
  }

  return ctx
}

// Define the types for props
interface TabsItemProps {
  id: string
  href: string
  children: ReactNode
}

function TabsItem({ id, children, href }: TabsItemProps) {
  return (
    <TabsItemContext.Provider value={id}>
      <li>
        <Link href={href}>{children}</Link>
      </li>
    </TabsItemContext.Provider>
  )
}

export default TabsItem
