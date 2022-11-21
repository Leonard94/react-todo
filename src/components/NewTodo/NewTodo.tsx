import { useContext, useState } from 'react'
import cn from 'classnames'

import { Input } from '../Input/Input'

import { addNewTodo } from '../../api/api'
import { TodoContext } from '../../context/TodoContext'

import { isValidInput } from '../../helpers/isValidInput/isValidInput'
import Date from '../../helpers/getDate/getDate'

import * as Icon from '../../assets/icons/index'
import styles from './styles.module.scss'

/**
 * Компонент, отвечающий за добавление новой задачи
 * В себе хранит состояние инпута,
 * ошибку - если поле не прошло валидацию,
 * статус загрузки - для блокирования кнопки.
 * 
 * Из контекста получаем функцию для обновления списка задач
 */

export const NewTodo = () => {
  const [value, setValue] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const { getAllTodos } = useContext(TodoContext)

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
    setError(null)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (isValidInput(value, setError)) {
      setLoading(true)
      const data = {
        title: value.trim(),
        timeCreate: Date.getCurrentDateAsTimestamp(),
      }
      addNewTodo(data)
        .then(() => {
          reset()
          getAllTodos()
        })
        .finally(() => setLoading(false))
    }
  }

  const btnStyles = cn(styles.btn, { [styles.btn_loading]: isLoading })

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.input_section}>
        <Input
          value={value}
          onChange={handleChangeValue}
          placeholder='Введите новую задачу'
          onFocus={() => setError(null)}
          error={error}
        />
        <button type='submit' className={btnStyles} disabled={isLoading}>
          {isLoading ? <Icon.Loader /> : <Icon.Add />}
        </button>
      </div>
    </form>
  )
}
