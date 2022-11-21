import { Button } from '../../../Button/Button'

import styles from './styles.module.scss'

/**
 * Кнопка сохранения отредактированной задачи
 * и кнопка закрытия модального окна.
 * 
 * Если нет изменений, кнопка "сохранить не активна"
 */

type TProps = {
  isLoading: boolean
  isChanged: boolean
  onClose: () => void
  handelSaveChanges: () => void
}

export const Controls: React.FC<TProps> = ({
  isLoading,
  isChanged,
  onClose,
  handelSaveChanges,
}) => {
  return (
    <div className={styles.btn_section}>
      <Button type='default' onClick={onClose} disabled={isLoading}>
        Отменить
      </Button>
      <Button
        type='primary'
        onClick={handelSaveChanges}
        disabled={isLoading || !isChanged}
      >
        Сохранить
      </Button>
    </div>
  )
}
