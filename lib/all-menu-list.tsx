import {
  Codewars,
  Devto,
  Facebook,
  FreeCodeCamp,
  FrontendMentor,
  Github,
  Gitlab,
  Hashnode,
  Linkedin,
  StackOverflow,
  Youtube,
} from '@/components/UI/icons'

interface MenuItem {
  id: string
  name: string
  icon: JSX.Element
}

// Define the menu list with proper typing
const allMenuList: MenuItem[] = [
  { id: 'github', name: 'GitHub', icon: <Github /> },
  { id: 'frontend-mentor', name: 'Frontend Mentor', icon: <FrontendMentor /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin /> },
  { id: 'youtube', name: 'YouTube', icon: <Youtube /> },
  { id: 'facebook', name: 'Facebook', icon: <Facebook /> },
  { id: 'devto', name: 'Dev.to', icon: <Devto /> },
  { id: 'codewars', name: 'Codewars', icon: <Codewars /> },
  { id: 'freecodecamp', name: 'freeCodeCamp', icon: <FreeCodeCamp /> },
  { id: 'gitlab', name: 'GitLab', icon: <Gitlab /> },
  { id: 'hashnode', name: 'Hashnode', icon: <Hashnode /> },
  { id: 'stack-overflow', name: 'Stack Overflow', icon: <StackOverflow /> },
]

export default allMenuList
