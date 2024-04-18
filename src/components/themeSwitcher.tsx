import Button from "@components/button";
import { Computer, Light, Moon } from "@assets/icons";
import { Theme, ThemeContext } from "@contexts/theme";
import { useContext } from "react";

const ThemeSwitcher = () => {
  const { theme, toggle, reset } = useContext(ThemeContext);

  return (
    <div className="flex gap-2">
      <Button onClick={toggle}>{theme === Theme.dark ? <Light /> : <Moon />}</Button>
      <Button onClick={reset}>
        <Computer />
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
