import * as Icon from '../../../../assets/icons/index'
import styles from './styles.module.scss'

type TProps = {
  setFile: (file: any) => void
  handleChangeSomething: () => void
  attachmentURL?: string
}

export const Attachment: React.FC<TProps> = ({
  attachmentURL,
  setFile,
  handleChangeSomething,
}) => {
  /**
   * Запрещено прикреплять файл более 1мб
   */
  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file.size > 1048576) {
        return alert('Размер файла не может быть больше 1 мб')
      }
      handleChangeSomething()
      setFile(file)
    }
  }

  /**
   * Если у задачи нет ссылки на файл, предлагается прикрепить его
   */
  if (!attachmentURL) {
    return (
      <div className={styles.file}>
        <label className={styles.label}>Прикрепить файл</label>
        <input
          type='file'
          onChange={handleAddFile}
          className={styles.input_file}
        />
      </div>
    )
  }

  return (
    <div className={styles.file}>
      <Icon.Attachment />
      <a
        href={attachmentURL}
        download={attachmentURL}
        target='_blank'
        rel='noreferrer'
        title='скачать'
      >
        Открыть прикреплённый файл
      </a>
    </div>
  )
}
