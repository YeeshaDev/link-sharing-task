'use client'
import DevLink from '../customize-links/dev-link'

interface DevLinkProps {
  id: string
  platform: string
  link: string
}

interface DisplayDevlinkListProps {
  devlinks: DevLinkProps[]
}

const DisplayDevlinkList: React.FC<DisplayDevlinkListProps> = ({
  devlinks,
}) => {
  return (
    <ul className="flex flex-col gap-5 items-center justify-center mt-14">
      {devlinks?.map((devlink) => <DevLink key={devlink.id} link={devlink} />)}
    </ul>
  )
}
export default DisplayDevlinkList
