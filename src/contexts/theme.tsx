import { FC, PropsWithChildren, createContext, useRef, useState } from "react";

export enum Theme {
  light = "light",
  dark = "dark",
}

export const ThemeContext = createContext({
  theme: Theme.light,
  toggle: () => {},
  reset: () => {},
});

type Props = PropsWithChildren;

const ThemeProvider: FC<Props> = ({ children }) => {
  const documentElementRef = useRef(document.documentElement);
  const userTheme = localStorage.getItem("theme") as Theme;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? Theme.dark
    : Theme.light;

  if (userTheme === Theme.dark || (!("theme" in localStorage) && systemTheme === Theme.dark)) {
    documentElementRef.current.classList.add(Theme.dark);
  } else {
    documentElementRef.current.classList.remove(Theme.dark);
  }

  const [theme, setTheme] = useState<Theme>(userTheme);

  const toggle = () => {
    const newTheme = theme === Theme.light ? Theme.dark : Theme.light;
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const reset = () => {
    localStorage.setItem("theme", systemTheme);
    setTheme(systemTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggle, reset }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
