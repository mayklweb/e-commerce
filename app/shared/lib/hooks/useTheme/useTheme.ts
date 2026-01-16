import { useContext } from 'react'
import { ThemeContext, ThemeContextProps } from '../../context/ThemeContext'
import { Theme } from '../../../const/theme.ts'

interface UseThemeResult {
  toggleTheme: (saveAction?: (theme: Theme) => void) => void
  theme: Theme
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext<ThemeContextProps>(ThemeContext)

  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
    let newTheme: Theme
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT
        break
      case Theme.LIGHT:
        newTheme = Theme.DARK
        break
      default:
        newTheme = Theme.LIGHT
    }
    setTheme?.(newTheme)
    localStorage.setItem('theme', newTheme)
    saveAction?.(newTheme)
  }

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  }
}
