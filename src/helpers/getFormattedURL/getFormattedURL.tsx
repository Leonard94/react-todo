import dayjs from 'dayjs'

/**
 * Функция, возвращающая уникальное имя файла,
 * для хранения на бэке
 */
export const getFormattedURL = (fileName: string): string => {
  const timestamp = dayjs(new Date()).unix()
  return timestamp + fileName
}
