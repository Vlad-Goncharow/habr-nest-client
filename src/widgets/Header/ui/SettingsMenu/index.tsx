import { Theme, useTheme } from 'entities/Theme'
import React from 'react'
import s from './SettingsMenu.module.scss'
import i18n from 'shared/lib/i18n'
import { useTranslation } from 'react-i18next'
interface SettingsMenuProps {
  onClose: any
}

const languages = [
  { language: 'langThemeSettingsInterfaceRu', id: 'ru' },
  { language: 'langThemeSettingsInterfaceEn', id: 'en' },
  { language: 'langThemeSettingsInterfaceUa', id: 'ua' },
]

const themes = [
  { theme: 'langThemeSettingsThemeDark', id: 'dark' },
  { theme: 'langThemeSettingsThemeLight', id: 'light' },
]

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  const {t} = useTranslation()
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
          <header className={s.header}>{t("langThemeSettingsTitle")}</header>
          <div className={s.form__item}>
            <div className={s.form__title}>{t("langThemeSettingsInterface")}</div>
            <div className={s.container}>
              {languages.map((el) => (
                <div onClick={() => i18n.changeLanguage(el.id)} key={el.id} className={s.checkbox}>
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
                    {t(el.language)}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={s.form__item}>
            <div className={s.form__title}>{t("langThemeSettingsTheme")}</div>
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
                    {t(el.theme)}
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
