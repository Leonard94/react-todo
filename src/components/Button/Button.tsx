import React from 'react'
import cn from 'classnames'

import styles from './styles.module.scss'

/**
 * Переиспользуемый компонент кнопки
 */

type TProps = {
  children: React.ReactNode
  type: 'primary' | 'default'
  onClick?: () => void
  full?: boolean
  disabled?: boolean
  style?: React.CSSProperties
}

export const Button: React.FC<TProps> = (props) => {
  const { children, type, onClick, full, disabled, style } = props

  const clickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (onClick) {
      event.preventDefault()
      event.stopPropagation()
      onClick()
    }
  }

  const btnClass = cn(styles.btn, {
    [styles[type]]: type,
    [styles.btn_full]: full,
  })

  return (
    <button
      className={btnClass}
      onClick={clickHandler}
      disabled={disabled}
      type='button'
      style={style}
    >
      {children}
    </button>
  )
}
