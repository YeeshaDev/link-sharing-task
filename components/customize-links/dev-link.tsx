import {
  Devto,
  Facebook,
  FrontendMentor,
  Github,
  Linkedin,
  Youtube,
  Codewars,
  FreeCodeCamp,
  Gitlab,
  Hashnode,
  StackOverflow,
  RightArrow,
} from '../UI/icons'

interface DevLinkProps {
  link: {
    platform: string
    link: string
    hasError?: boolean
  }
  mockup?: boolean
}

const DevLink: React.FC<DevLinkProps> = ({ link, mockup = false }) => {
  if (!link || link.hasError) return null

  let icon: JSX.Element | undefined
  let bgColor: string | undefined

  switch (link.platform) {
    case 'GitHub':
      icon = <Github color="#FFFFFF" />
      bgColor = 'bg-icons-github'
      break
    case 'Frontend Mentor':
      icon = <FrontendMentor />
      bgColor = 'bg-icons-frontend-mentor'
      break
    case 'LinkedIn':
      icon = <Linkedin color="#FFFFFF" />
      bgColor = 'bg-icons-linkedin'
      break
    case 'YouTube':
      icon = <Youtube color="#FFFFFF" />
      bgColor = 'bg-icons-youtube'
      break
    case 'Facebook':
      icon = <Facebook color="#FFFFFF" />
      bgColor = 'bg-icons-facebook'
      break
    case 'Dev.to':
      icon = <Devto color="#FFFFFF" />
      bgColor = 'bg-icons-devto'
      break
    case 'Codewars':
      icon = <Codewars color="#FFFFFF" />
      bgColor = 'bg-icons-codewars'
      break
    case 'freeCodeCamp':
      icon = <FreeCodeCamp color="#FFFFFF" />
      bgColor = 'bg-icons-free-code-camp'
      break
    case 'GitLab':
      icon = <Gitlab color="#FFFFFF" />
      bgColor = 'bg-icons-gitlab'
      break
    case 'Hashnode':
      icon = <Hashnode color="#FFFFFF" />
      bgColor = 'bg-icons-hashnode'
      break
    case 'Stack Overflow':
      icon = <StackOverflow color="#FFFFFF" />
      bgColor = 'bg-icons-stack-overflow'
      break
    default:
      icon = undefined
      bgColor = undefined
      break
  }

  if (!icon || !bgColor) return null

  return (
    <li>
      <a
        className={`rounded-lg p-4 text-white flex items-center justify-between w-[237px] h-[56px] hover:bg-opacity-50 transition-all duration-200 cursor-pointer ${
          link.platform === 'Frontend Mentor'
            ? '!text-neutral-dark-grey border border-neutral-borders hover:bg-opacity-100 hover:bg-black/10'
            : ''
        } ${bgColor} ${mockup ? '!h-[44px] mb-5' : 'hover:scale-105'}`}
        href={link.link ? link.link : '#'}
        target={link.link ? '_blank' : ''}
      >
        <span className="flex items-center gap-2">
          <span>{icon}</span>
          <span>{link.platform}</span>
        </span>
        <span>
          <RightArrow
            color={link.platform === 'Frontend Mentor' ? '#333333' : '#fff'}
          />
        </span>
      </a>
    </li>
  )
}

export default DevLink
