'use client'
import { useDroppable } from '@dnd-kit/core'

interface DroppableProps {
  id: string
  className?: string
  children: any
}

const Droppable: React.FC<DroppableProps> = ({ children, id, className }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }
  return (
    <ul ref={setNodeRef} style={style} className={className || ''}>
      {children}
    </ul>
  )
}
export default Droppable
