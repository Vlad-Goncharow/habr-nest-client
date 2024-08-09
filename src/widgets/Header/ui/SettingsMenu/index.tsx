import { Theme, useTheme } from 'entities/Theme'
import React from 'react'
import s from './SettingsMenu.module.scss'

interface SettingsMenuProps {
  onClose: any
}

const languages = [
  { language: 'Русский', id: 'ru' },
  { language: 'English', id: 'en' },
]

const themes = [
  { theme: 'Темная', id: 'dark' },
  { theme: 'Светлая', id: 'light' },
]

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  const { theme, toggleTheme } = useTheme()

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '17px'

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const handleTheme = event.target.id as Theme
    toggleTheme(handleTheme)
  }

  return (
    <div className='overlay'>
      <div className={s.wrapper}>
        <button onClick={onClose} className={s.close}></button>

        <form className={s.form}>
          <header className={s.header}>Настройка страницы</header>
          <div className={s.form__item}>
            <div className={s.form__title}>Интерфейс</div>
            <div className={s.container}>
              {languages.map((el) => (
                <div key={el.id} className={s.checkbox}>
                  <label htmlFor={el.id}>
                    <div className={s.checkbox__ui}>
                      <input
                        id={el.id}
                        name='language'
                        type='radio'
                        className={s.checkbox__radio_real}
                      />
                      <span className={s.checkbox__radio_fake}></span>
                    </div>
                    {el.language}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={s.form__item}>
            <div className={s.form__title}>Цветовая тема</div>
            <div className={s.container}>
              {themes.map((el) => (
                <div key={el.id} className={s.checkbox}>
                  <label htmlFor={el.id}>
                    <div className={s.checkbox__ui}>
                      <input
                        id={el.id}
                        name='theme'
                        type='radio'
                        className={s.checkbox__radio_real}
                        checked={theme === el.id}
                        onChange={handleThemeChange}
                      />
                      <span className={s.checkbox__radio_fake}></span>
                    </div>
                    {el.theme}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SettingsMenu
