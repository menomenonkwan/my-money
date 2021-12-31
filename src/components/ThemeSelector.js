import { useThemeContext } from "../hooks/useThemeContext"
// styles
import styles from './ThemeSelector.module.css';
import lightMode from '../assets/light_mode.svg';
import darkMode from '../assets/dark_mode.svg';

export default function ThemeSelector() {
  const { mode, changeMode } = useThemeContext();

  const handleClick = () => {
    changeMode(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <div className={styles.theme} onClick={handleClick}>
      <img src={mode === 'light' ? darkMode : lightMode} alt="change light mode" />
    </div>
  )
}
