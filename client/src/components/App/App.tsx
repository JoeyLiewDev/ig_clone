import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Layout } from "../Layout";
import { Home } from "../../routes/Home";
import { Register } from "../../routes/Register";
import { Login } from "../../routes/Login";
import { Loading } from "../Loading";
import { AuthenticationRoute } from "../AuthenticationRoute";
import { initializeSession } from "../../utils/initializeSession";
import { loadSession } from "../../redux/authentication";

export const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeSession(() => dispatch(loadSession(setLoading)), setLoading);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <AuthenticationRoute exact path="/register">
            <Register />
          </AuthenticationRoute>
          <AuthenticationRoute exact path="/login">
            <Login />
          </AuthenticationRoute>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
