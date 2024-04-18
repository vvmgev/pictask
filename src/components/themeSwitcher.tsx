import Button from "@components/button";
import moon from "@assets/icons/dark.svg";
import light from "@assets/icons/light.svg";
import computer from "@assets/icons/computer.svg";
import { Theme, ThemeContext } from "@contexts/theme";
import { useContext } from "react";

const ThemeSwitcher = () => {
  const { theme, toggle, reset } = useContext(ThemeContext);

  return (
    <div className="flex gap-2">
      <Button onClick={toggle}>
        <img src={theme === Theme.dark ? light : moon} className="w-6 h-6" />
      </Button>
      <Button onClick={reset}>
        <img src={computer} className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
