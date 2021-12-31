import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw Error('useThemeContext must be inside an ThemeContextProvider');
  }

  return context;
}