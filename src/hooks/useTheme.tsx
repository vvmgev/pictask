import { useContext } from "react";
import { ThemeContext } from "src/contexts/theme";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
