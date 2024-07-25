'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'

// Define types for Draggable component props
interface DraggableProps {
  id: string
  className?: string
  disabled?: boolean
  children: any
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  id,
  className,
  disabled,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      disabled,
    })

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={className || ''}
      {...attributes}
      {...listeners}
    >
      {children}
    </li>
  )
}

export default Draggable
