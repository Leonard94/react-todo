/**
 * Логика валидации поля "название задачи"
 */
export const isValidInput = (
  text: string,
  setErrorText: (error: string) => void
) => {
  const value = text.trim().length

  if (value === 0) {
    return setErrorText('Поле не может быть пустым')
  }
  if (value < 3) {
    return setErrorText('Поле должно содержать не менее 3 символов')
  }

  return (
    value < 55 || setErrorText('Поле не должно содержать более 55 символов')
  )
}
