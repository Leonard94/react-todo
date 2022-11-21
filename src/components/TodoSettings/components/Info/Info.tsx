import * as Icon from '../../../../assets/icons/index'
import Date from '../../../../helpers/getDate/getDate'

import styles from './styles.module.scss'

type TProps = {
  timeCreate: number
  handleDelete: () => void
}

/**
 * Показывает дату создания и кнопку удаления задачи
 */

export const Info: React.FC<TProps> = ({ timeCreate, handleDelete }) => {
  return (
    <>
      <div className={styles.time_create}>
        Создано {Date.getFormattedDateFromTimestamp(timeCreate)}
      </div>
      <div className={styles.icon} onClick={handleDelete}>
        <Icon.Delete />
        <span>Удалить задачу</span>
      </div>
    </>
  )
}
