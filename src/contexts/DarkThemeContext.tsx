import { createContext, ReactNode, useState, useEffect } from 'react';

type DarkThemeContextType = {
  isDarkTheme: boolean | undefined;
  toggleDarkTheme: () => void;
}

type DarkThemeContextProviderProps = {
  children: ReactNode;
}

export const DarkThemeContext = createContext({} as DarkThemeContextType);

export function DarkThemeContextProvider(props: DarkThemeContextProviderProps) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | undefined>();

  useEffect(() => {
    if (isDarkTheme === undefined) {
      // recupera quando inicia
      const preferredTheme = localStorage.getItem('preferred-theme');
      setIsDarkTheme(preferredTheme === 'dark');
    } else {
      // salva quando alterar o tema
      const preferredTheme = isDarkTheme ? 'dark' : 'light';
      localStorage.setItem('preferred-theme', preferredTheme);
    }
  }, [isDarkTheme]);

  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <DarkThemeContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {props.children}
    </DarkThemeContext.Provider>
  );
}
