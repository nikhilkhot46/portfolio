'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={cn('max-w-2xl', alignment)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className={cn('chip mb-5', align === 'center' && 'mx-auto')}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#22d3ee]" />
          <span className="tracking-wider uppercase text-[10px] text-white/70">{eyebrow}</span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
