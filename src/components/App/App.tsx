import { useState } from 'react'

import { getTodos } from '../../api/api'
import { TodoContext } from '../../context/TodoContext'
import { TTodo } from '../../types/types'

import { Header } from '../Header/Header'
import { NewTodo } from '../NewTodo/NewTodo'
import { TodosList } from '../TodosList/TodosList'

import styles from './styles.module.scss'

export const App = () => {
  const [todosList, setTodosList] = useState<null | TTodo[]>(null)

  /**
   * Получаем все задачи с сервера,
   * передаём в состояние и прокидываем в компоненты
   */
  const getAllTodos = () => {
    return getTodos().then((resp: any) => setTodosList(resp))
  }

  return (
    <div className='app'>
      <Header />
      <div className={styles.inner}>
        <div className={styles.body}>
          <TodoContext.Provider value={{ todosList, getAllTodos }}>
            <NewTodo />
            <TodosList />
          </TodoContext.Provider>
        </div>
      </div>
    </div>
  )
}
