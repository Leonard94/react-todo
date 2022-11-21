import { useContext, useState } from 'react'

import { deleteTodo, updateTodo } from '../../api/api'
import { TodoContext } from '../../context/TodoContext'
import { TTodoUpdate } from '../../types/types'

import { isValidInput } from '../../helpers/isValidInput/isValidInput'
import Date from '../../helpers/getDate/getDate'

import { DateEnd } from './components/DateEnd/DateEnd'
import { Attachment } from './components/Attachment/Attachment'
import { Controls } from './components/Controls/Controls'
import { Info } from './components/Info/Info'
import { Input } from '../Input/Input'

/**
 * Компонент редактирования задачи
 */

type TProps = {
  id: string
  title: string
  description?: string
  timeCreate: number
  timeEnd?: number
  attachmentURL?: string
  onClose: () => void
}

export const TodoSettings: React.FC<TProps> = ({
  id,
  title,
  description = '',
  timeCreate,
  timeEnd,
  attachmentURL,
  onClose,
}) => {
  const [file, setFile] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [inputError, setInputError] = useState<null | string>(null)
  const [values, setValues] = useState({
    title,
    description,
    timeEnd: Date.getDateForInputFormat(timeEnd) || '',
  })

  const { getAllTodos } = useContext(TodoContext)

  /**
   * Для индикации того, что пользователь что-то поменял и активации кнопки "сохранить"
   */
  const handleChangeSomething = () => {
    setIsChanged(true)
  }

  /**
   * Функция изменения состояния всех инпутов
   */
  const handleOnChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isChanged) handleChangeSomething()
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  /**
   * Если поле "название задачи" не пустое - отправляются изменения на сервер.
   * Если пользователь добавил файл - то добавляем в объект новый ключ с этим объектом,
   * для отправки файла на сервер и получения ссылки на него. За это отвечает функция updateTodo
   */
  const handelSaveChanges = () => {
    if (isValidInput(values.title, setInputError)) {
      const data: TTodoUpdate = {
        title: values.title,
        description: values.description,
        timeEnd: Date.getDateAsTimestamp(values.timeEnd) || null,
      }
      if (file) {
        data.attachmentURL = file
      }
      setLoading(true)

      updateTodo(id, data)
        .then(getAllTodos)
        .finally(() => {
          onClose()
          setLoading(false)
        })
    }
  }

  const handleDelete = () => {
    deleteTodo(id)
      .then(getAllTodos)
      .finally(() => onClose())
  }

  return (
    <form>
      <Info timeCreate={timeCreate} handleDelete={handleDelete} />
      <Input
        name='title'
        value={values.title}
        onChange={handleOnChangeValues}
        label='Имя задачи'
        placeholder='Введите имя задачи'
        style={{ marginBottom: '20px' }}
        error={inputError}
        onFocus={() => setInputError(null)}
      />
      <Input
        name='description'
        value={values.description}
        onChange={handleOnChangeValues}
        label='Описание задачи'
        placeholder='Введите описание задачи'
        style={{ marginBottom: '20px' }}
      />
      <DateEnd timeEnd={values.timeEnd} onChange={handleOnChangeValues} />
      <Attachment
        attachmentURL={attachmentURL}
        setFile={setFile}
        handleChangeSomething={handleChangeSomething}
      />
      <Controls
        isLoading={isLoading}
        isChanged={isChanged}
        onClose={onClose}
        handelSaveChanges={handelSaveChanges}
      />
    </form>
  )
}
