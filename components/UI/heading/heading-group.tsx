import React from 'react'

interface HeadingGroupProps {
  title: string
  subtitle: string
}

const HeadingGroup: React.FC<HeadingGroupProps> = ({ title, subtitle }) => {
  return (
    <div className="text-start flex flex-col gap-2">
      <h1 className="text-neutral-dark-grey text-2xl font-bold md:text-3xl">
        {title}
      </h1>
      <h2 className="text-neutral-grey">{subtitle}</h2>
    </div>
  )
}

export default HeadingGroup
