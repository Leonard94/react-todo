import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'

import { getFormattedURL } from '../helpers/getFormattedURL/getFormattedURL'
import { TCreateTodo, TTodoUpdate } from '../types/types'

/**
 * Получить с бэка все задачи и вернуть массив
 */
export const getTodos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'))
    const todoList = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id }
    })
    return todoList
  } catch (e) {
    console.error(e)
  }
}

/**
 * Создать новую задачу
 * @param {string} title - название задачи
 * @param {number} timeCreate - время создания задачи в виде временной метки
 */
export const addNewTodo = async (data: TCreateTodo) => {
  try {
    await addDoc(collection(db, 'tasks'), data)
  } catch (e) {
    console.error(e)
  }
}

/**
 * Редактирование задачи:
 * - если пользователь добавил файл, сначала добавляется файл на бэк через функцию "addFile" и запрашивается URL,
 * который после вставляется в объект задачи
 * - если файла нет, то отправляютя данные без URL файла
 */
export const updateTodo = async (id: string, data: TTodoUpdate) => {
  try {
    if (data.attachmentURL) {
      const fileName = await addFile(data.attachmentURL)
      if (fileName) data.attachmentURL = await getFileUrl(fileName)
    }
    const todo = await doc(db, 'tasks', id)
    await updateDoc(todo, data)
  } catch (e) {
    console.error(e)
  }
}

/**
 * Переключение статуса задачи
 */
export const toggleCompleted = async (id: string, completed: boolean) => {
  try {
    const todo = await doc(db, 'tasks', id)
    await updateDoc(todo, { completed: !completed })
  } catch (e) {
    console.error(e)
  }
}

/**
 * Удаление задачи
 */
export const deleteTodo = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'tasks', id))
  } catch (e) {
    console.error(e)
  }
}

/**
 * Добавление файла на бэк.
 * Формируется уникальное имя, загружается на сервер с этим именем
 */
const addFile = async (fileUpload: any) => {
  try {
    const link = getFormattedURL(fileUpload.name)
    const fileRef = ref(
      storage,
      `${process.env.REACT_APP_STORAGE_FOLDER}/${link}`
    )
    await uploadBytes(fileRef, fileUpload)
    return link
  } catch (e) {
    console.error(e)
  }
}

/**
 * Получаем ссылку на файл для вставки на страницу или открытия
 */
const getFileUrl = async (fileName: string) => {
  try {
    return getDownloadURL(
      ref(storage, `${process.env.REACT_APP_STORAGE_FOLDER}/${fileName}`)
    )
  } catch (e) {
    console.error(e)
  }
}
