'use client'

import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
}

export function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={className}
      type="button"
    >
      {children}
    </button>
  )
}
