import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

import 'dayjs/locale/ru'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.locale('ru')

class Time {
  /**
   * Получить текущее время с помощью библиотеки dayjs
   */
  getCurrentDate() {
    return dayjs(new Date())
  }

  /**
   * Конвертировать текущее время в временную метку для хранения на бэке
   */
  getCurrentDateAsTimestamp() {
    return dayjs(this.getCurrentDate()).unix()
  }

  /**
   * Конвертировать дату, которую передаём, во временную метку
   */
  getDateAsTimestamp(date: string) {
    return dayjs(date).unix()
  }

  /**
   * Конвертировать временную метку в понятный пользователю формат
   */
  getFormattedDateFromTimestamp(timestamp: number) {
    return dayjs(timestamp * 1000).format('DD.MM в HH:mm')
  }

  /**
   * Преобразовать временную метку, которая приходит с бека,
   * в дату и привести к нужному формату для input datetime-local
   */
  getDateForInputFormat(timestamp: number | undefined) {
    if (timestamp) {
      return dayjs(timestamp * 1000).format('YYYY-MM-DDTHH:mm')
    } else {
      return undefined
    }
  }

  /**
   * Получаем текущее время
   * в формате гггг-мм-дд чч:мм
   * Такой формат требуется для input datetime-local
   */
  getCurrentDateForInputFormat() {
    return dayjs(this.getCurrentDate()).format('YYYY-MM-DDTHH:mm')
  }
}

export default new Time()
