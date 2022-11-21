export type TTodo = {
  id: string
  title: string
  description: string
  completed: boolean
  timeCreate: number
  timeEnd?: number
  attachmentURL?: string
}

export type TTodoUpdate = {
  title: string
  description: string
  timeEnd: number | null
  attachmentURL?: string
}

export type TCreateTodo = {
  title: string
  timeCreate: number
}

export type TLoading = 'pending' | 'loading' | 'fulfilled'
