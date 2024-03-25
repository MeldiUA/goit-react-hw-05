import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

export default function Navigation() {
  const makeLinkClass = ({ isActive }) => {
    return clsx(css.navLink, isActive && css.isActive);
  };
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={makeLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={makeLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
}
