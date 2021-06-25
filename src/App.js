import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Nav from './components/Nav'
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddPlant from "./pages/AddPlant"
import UserProfile from "./pages/UserProfile"
import PrivateRoute from "./components/PrivateRoute";
import EditPlant from "./pages/EditPlant";

const Content = styled.div`
  margin-top: 150px;
  @media (min-width: 700px) {
    margin-top: 100px;
  }
`;

function App() {
  return (
    <div className="App">
      <Nav />
      <Content>
        <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/profile" component={UserProfile} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/plants/:id" component={EditPlant} />
        <PrivateRoute path="/plants" component={EditPlant} exact />
        <PrivateRoute path="/addplant" component={AddPlant} exact />
      </Content>
    </div>
  );
}

export default App;