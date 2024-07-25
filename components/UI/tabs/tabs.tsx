import React from 'react'
import TabsItem from './tabs-item'
import TabsTitle from './tabs-title'


interface TabsProps {
  className?: string
  children?: React.ReactNode
}


interface TabsComponent extends React.FC<TabsProps> {
  Item: typeof TabsItem
  Title: typeof TabsTitle
}

const Tabs: TabsComponent = ({ children, className }) => {
  return (
    <nav className={className}>
      <ul className="flex items-center justify-center">{children}</ul>
    </nav>
  )
}


Tabs.Item = TabsItem
Tabs.Title = TabsTitle

export default Tabs
