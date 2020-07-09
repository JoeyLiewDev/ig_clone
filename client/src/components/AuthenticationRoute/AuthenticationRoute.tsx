import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { AuthState } from "../../types/authentication";

interface Props {
  children: ReactNode;
  exact?: boolean;
  path: string;
}

export const AuthenticationRoute = ({ children, ...rest }: Props) => {
  const isAuthenticated = useSelector(
    (state: AuthState) => state.authentication.isAuthenticated
  );

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return <Route {...rest}>{children}</Route>;
  }
};
