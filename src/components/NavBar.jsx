import { NavLink } from 'react-router-dom';
import styles from "./NavBar.module.css";

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <NavLink to="/">🌏 Home</NavLink>
            <NavLink to="/spacecrafts">🚀 Spacecrafts</NavLink>
            <NavLink to="/planets">🪐 Planets</NavLink>        
        </nav>
    );
}