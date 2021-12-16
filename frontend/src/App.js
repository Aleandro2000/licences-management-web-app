import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import Homepage from "./sections/Homepage";
import Login from "./sections/Login";
import Register from "./sections/Register";
import Dashboard from "./sections/Dashboard";
import NotFound from "./sections/NotFound";

import { UniversitiesContext, UserContext } from "./context/UserContext";

export default function App() {
  const [user, setUser] = useState();
  const [universities, setUniversities] = useState([]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <UniversitiesContext.Provider value={[universities, setUniversities]}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <PublicRoute restricted={false} exact path="/home" component={Homepage} />
            <PublicRoute restricted={true} exact path="/login" component={Login} />
            <PublicRoute restricted={true} exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PublicRoute restricted={false} component={NotFound} />
          </Switch>
        </BrowserRouter>
      </UniversitiesContext.Provider>
    </UserContext.Provider>
  );
}