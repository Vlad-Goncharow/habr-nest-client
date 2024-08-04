import { useContext } from 'react'

import { Theme, ThemeContext } from '../config/ThemeContext'

interface UseThemeResults {
  theme?: Theme
  toggleTheme: (newTheme: Theme) => void
}

export const useTheme = (): UseThemeResults => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = (newTheme: Theme) => {
    document.querySelector('body')?.setAttribute('data-theme', newTheme)
    setTheme?.(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return { theme, toggleTheme }
}
