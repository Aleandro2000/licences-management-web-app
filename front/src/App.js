import React,{ Component } from "react";
import { BrowserRouter,Switch,Route,Redirect } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import './App.css';

import Homepage from "./sections/Homepage";
import Login from "./sections/Login";
import Register from "./sections/Register";
import Dashboard from "./sections/Dashboard";

export default class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/homepage"/>
          </Route>
          <PublicRoute restricted={false} exact path="/homepage" component={Homepage}/>
          <PublicRoute restricted={true} exact path="/login" component={Login}/>
          <PublicRoute restricted={true} exact path="/register" component={Register}/>
          <PrivateRoute exact path="/dsahboard" component={Dashboard}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
