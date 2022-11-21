import styles from './styles.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.author}>
          <h1>Todo app</h1>
          <a href='https://vladkoleda.ru/'>by Koleda</a>
        </div>
      </div>
    </header>
  )
}
