import { useContext } from 'react';
import { DarkThemeContext } from '../contexts/DarkThemeContext';

export function useDarkTheme() {
  return useContext(DarkThemeContext);
}
