import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

const variants = {
  primary: 'bg-primary text-white active:bg-primary-active disabled:bg-primary-disabled',
  secondary: 'bg-surface-strong text-ink active:bg-hairline',
  'secondary-dark': 'bg-surface-dark-elevated text-on-dark active:bg-ink',
  'outline-dark': 'border border-white text-on-dark',
  text: 'px-0 text-primary',
} as const

const sizes = {
  md: 'h-11 px-5 text-base',
  sm: 'h-9 px-4 text-sm',
} as const

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-pill font-semibold transition-colors disabled:cursor-not-allowed',
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
