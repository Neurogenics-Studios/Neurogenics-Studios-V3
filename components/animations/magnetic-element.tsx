"use client"

import { useRef, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface MagneticElementProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticElement({ children, className = "", strength = 20 }: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Use springs for smooth elastic movement
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    // Scale movement by strength
    x.set(middleX * (strength / 100))
    y.set(middleY * (strength / 100))
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
      style={{
        x,
        y,
        display: "inline-flex"
      }}
    >
      {children}
    </motion.div>
  )
}
