import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import ThemeSelector from './ThemeSelector';
// styles
import styles from './Navbar.module.css';
import menuCloseBtn from '../assets/menu_close.svg';
import menuOpenBtn from '../assets/menu_open.svg';
import { useThemeContext } from '../hooks/useThemeContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { mode } = useThemeContext();

  return (
    <div className={`${mode} ${styles.navbar}`}>
      <nav>
        <Link to="/" className={styles.brand}>
          <h2>myMoney</h2>
        </Link>

        {user && <p className={styles.display}>{user.email}</p>}
        <ThemeSelector />
        
        {!user && <button className={styles['mobile-open']} onClick={() => setMenuOpen(!menuOpen)}>
              <img src={menuOpenBtn} alt="open menu" />
            </button>}


        <div className={`${styles.links} ${menuOpen ? styles['menu-active'] : styles['menu-inactive']}`}>
          {!user && <>
            <button className={styles['mobile-close']} onClick={() => setMenuOpen(!menuOpen)}>
              <img src={menuCloseBtn} alt="close menu" />
            </button>
            <Link to="/login" className={styles.link} onClick={() => setMenuOpen(!menuOpen)}>login</Link>
            <Link to="/signup" className={styles.link} onClick={() => setMenuOpen(!menuOpen)}>signup</Link>
          </>}
          {user && <button onClick={logout} className={styles.logout}>logout</button>}
        </div>
        {user && <button onClick={logout} className={`${styles.logout} ${styles['mobile-logout']}`}>logout</button>}
      </nav>

    </div>
  )
}
