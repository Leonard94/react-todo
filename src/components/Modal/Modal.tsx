import { Portal } from './Portal/Portal'
import styles from './styles.module.scss'

/**
 * Переиспользуемый компонент модального окна.
 * Отвечает за открытие\закрытие и стили дочерних компонентов
 * Если модальное окно закрыто, оно не будет отображаться
 */

type TProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<TProps> = ({ children, onClose, isOpen }) => {
  if (!isOpen) {
    return null
  }

  return (
    <Portal>
      <div className={styles.modal}>
        <div className={styles.overlay} onClick={onClose} />
        <div className={styles.body}>{children}</div>
      </div>
    </Portal>
  )
}
