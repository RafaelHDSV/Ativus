import clsx from 'clsx'
import React, { forwardRef } from 'react'
import styles from './Pressable.module.scss'

export type IPressableProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'ref'
> & {
  icon?: boolean
  animateHover?: boolean
}

export const Pressable = forwardRef<HTMLButtonElement, IPressableProps>(
  (
    { type, className = '', children, icon, animateHover = true, ...props },
    ref
  ) => {
    return (
      <button
        type={type ?? 'button'}
        ref={ref}
        className={clsx(
          styles.pressable,
          icon && styles['pressable--icon'],
          animateHover && styles['pressable--animated-hover'],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
