import Date from '../../../../helpers/getDate/getDate'

import styles from './styles.module.scss'

/**
 * Компонент для отображения / добавления времени задачи.
 * 
 * Не работает корректно во всех браузерах. Нужно сделать 2 инпута:
 * input type date и input type time для кроссбраузерности
 */

type TProps = {
  timeEnd: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const DateEnd: React.FC<TProps> = ({ timeEnd, onChange }) => {
  return (
    <div className={styles.input_section}>
      <label className={styles.label}>Дата выполнения</label>
      <input
        type='datetime-local'
        name='timeEnd'
        min={Date.getCurrentDateForInputFormat()}
        value={timeEnd}
        onChange={onChange}
        className={styles.input_date}
      />
    </div>
  )
}
