import { useEffect, useContext, useState } from 'react'

import { TodoContext } from '../../context/TodoContext'
import { TLoading, TTodo } from '../../types/types'

import { Skeleton } from './components/Skeleton/Skeleton'
import { Todo } from './components/Todo/Todo'

export const TodosList = () => {
  const { todosList, getAllTodos } = useContext(TodoContext)
  const [loading, setLoading] = useState<TLoading>('pending')

  useEffect(() => {
    getAllTodos().then(() => setLoading('fulfilled'))
  }, [])

  if (todosList?.length === 0 && loading === 'fulfilled') {
    return <div>Задач пока нет</div>
  }

  return (
    <>
      <div>{loading === 'pending' && <Skeleton />}</div>
      <div>
        {loading === 'fulfilled' &&
          todosList &&
          todosList.map((item: TTodo) => <Todo key={item.id} {...item} />)}
      </div>
    </>
  )
}
