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
    // salvar e recuperar theme
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
