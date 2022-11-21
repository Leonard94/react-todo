import { useContext, useState } from 'react'
import cn from 'classnames'

import { TodoContext } from '../../../../context/TodoContext'
import { toggleCompleted } from '../../../../api/api'
import { TTodo } from '../../../../types/types'
import Date from '../../../../helpers/getDate/getDate'

import { TodoSettings } from '../../../TodoSettings/TodoSettings'
import { Modal } from '../../../Modal/Modal'

import * as Icon from '../../../../assets/icons/index'
import styles from './styles.module.scss'

/**
 * Компонент, отображающий задачу в списке задач.
 *
 * Показывает:
 * - Имя задачи
 * - Описание (опционально)
 * - Статус задачи
 * - Время выполнения задачи (если назначено)
 * - Наличие прикрепленного файла (если есть)
 *
 * Хранит состояние модального окна с настройками
 */

export const Todo: React.FC<TTodo> = (props) => {
  const { id, title, description, completed, timeEnd, attachmentURL } = props

  const [isOpenSettings, setIsOpenSettings] = useState(false)
  const { getAllTodos } = useContext(TodoContext)

  const handleToggleCompleted = () => {
    toggleCompleted(id, completed).then(() => getAllTodos())
  }

  const handleToggleSettings = () => {
    setIsOpenSettings(!isOpenSettings)
  }

  const todoStyles = cn(styles.todo, {
    [styles.todo_completed]: completed,
    [styles.todo_expired]:
      timeEnd && !completed && timeEnd < Date.getCurrentDateAsTimestamp(),
  })

  return (
    <>
      <div className={todoStyles}>
        <span className={styles.state} onClick={handleToggleCompleted}>
          {completed ? <Icon.Completed /> : <Icon.UnCompleted />}
        </span>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
          <div className={styles.info}>
            {timeEnd && (
              <div className={styles.info_item}>
                <Icon.Time className={styles.timeEnd} />
                <span>{Date.getFormattedDateFromTimestamp(timeEnd)}</span>
              </div>
            )}
            {attachmentURL && (
              <div className={styles.info_item}>
                <Icon.Attachment />
                <span>Прикреплённый файл</span>
              </div>
            )}
          </div>
        </div>
        <span className={styles.settings} onClick={handleToggleSettings}>
          <Icon.Settings />
        </span>
      </div>
      <Modal isOpen={isOpenSettings} onClose={handleToggleSettings}>
        <TodoSettings onClose={handleToggleSettings} {...props} />
      </Modal>
    </>
  )
}
