import React, { useEffect, useState } from "react";
import {Route} from "react-router-dom";
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
import { connect } from 'react-redux';
import { getPlants, getUser, updateUser, addPlant, deletePlant, updatePlant, loginUser } from './actions';
import LoadingPage from "./pages/LoadingPage";

const Content = styled.div`
  margin-top: 150px;
  @media (min-width: 700px) {
    margin-top: 100px;
  }
`;

function App(props) {
  const { plants, user, getPlants, getUser, updateUser, addPlant, deletePlant, updatePlant, loginUser } = props;
  const [fetchingStatus, setfetchingStatus] = useState(false)
  const [err, setErr] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const uid = localStorage.getItem('uid');
      getUser(uid);
      getPlants(uid);
    }
  },[getUser,getPlants, loginUser]);

  const handleError = (x) => {
    setErr(x);
    setfetchingStatus(false);
  };

    return (
        <div className="App">
            <Nav/>
            <Content>
                <Route exact path="/" component={() => <Welcome user={user.data} />}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={() => fetchingStatus === false ? <Login appErr={err} errHandle={handleError} fetchStatus={setfetchingStatus} loginUser={loginUser} user={user} /> : <LoadingPage />}/>
                <PrivateRoute path="/profile" component={() => <UserProfile user={user.data} updateUser={updateUser} errs={user.error} />}/>
                <PrivateRoute path="/addplant" component={() => <AddPlant addPlant={addPlant} />} exact />
                <PrivateRoute path="/home" component={() => <Home plants={plants.data} />}/>
                <PrivateRoute path="/plants" component={() => <EditPlant plants={plants.data} updatePlant={updatePlant} />} exact/>
                <PrivateRoute path="/plants/:id" component={() => <EditPlant plants={plants.data} updatePlant={updatePlant} deletePlant={deletePlant} />} exact/>

            </Content>
        </div>
    );
}

const mapStateToProps = (state) => {
  return {
    plants: state.plants,
    user: state.user
  }
}

export default connect(mapStateToProps,{getPlants,getUser,updateUser,addPlant,deletePlant,updatePlant,loginUser}) (App);