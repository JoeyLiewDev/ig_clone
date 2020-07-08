import React from "react";

import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__logo_link}>
        IG
      </Link>
      <nav className={styles.header__nav}>
        <NavLink to="/register" className={styles.header__nav_link}>
          Sign Up
        </NavLink>
        <NavLink to="/login" className={styles.header__nav_link}>
          Log In
        </NavLink>
      </nav>
    </header>
  );
};
