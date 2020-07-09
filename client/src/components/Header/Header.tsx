import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import styles from "./Header.module.scss";
import { Button } from "../Button";
import { logout } from "../../redux/authentication";

interface AuthState {
  authentication: {
    isAuthenticated: boolean;
  };
}

export const Header = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: AuthState) => state.authentication.isAuthenticated
  );

  const navElements = isAuthenticated ? (
    <>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </>
  ) : (
    <>
      <NavLink to="/register" className={styles.header__nav_link}>
        Sign Up
      </NavLink>
      <NavLink to="/login" className={styles.header__nav_link}>
        Log In
      </NavLink>
    </>
  );

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__logo_link}>
        IG
      </Link>
      <nav className={styles.header__nav}>{navElements}</nav>
    </header>
  );
};
