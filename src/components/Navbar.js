import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
// styles
import styles from './Navbar.module.css';
// import logo from '../assets/logo512.png';

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <div className={styles.navbar}>
      <nav>
        {/* <img src={logo} className={styles.logo} alt="" /> */}
        <Link to="/" className={styles.brand}>
          <h2>myMoney</h2>
        </Link>

        {user && <p className={styles.display}>{user.email}</p>}
        
        <div className={styles.links}>
          {!user && <>
            <Link to="/login" className={styles.link}>login</Link>
            <Link to="/signup" className={styles.link}>signup</Link>
          </>}
          {user && <button onClick={logout} className={styles.logout}>logout</button>}
        </div>
      </nav>
    </div>
  )
}
