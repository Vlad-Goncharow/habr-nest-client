import { FC, useMemo, useState } from 'react'

import { Theme, ThemeContext } from '../../config/ThemeContext'

const defaultTheme = (localStorage.getItem('theme') as Theme) || Theme.LIGHT

interface IThemeProvider {
  children: JSX.Element
}

export const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  const defaultValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  )
}
