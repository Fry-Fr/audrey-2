import { axiosWithAuth } from "../utilities/axiosCalls";
import axios from "axios";

export const GET_PLANTS = "GET_PLANTS";
export const GET_USER = "GET_USER";
export const GET_SUCCESS = "GET_SUCCESS";
export const GET_SUCCESS_USER = "GET_SUCCESS_USER";
export const GET_ERROR = "GET_ERROR";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";

export const getPlants = (id)=> (dispatch)=>{
    dispatch({type: GET_PLANTS})
    axiosWithAuth()
    .get(`/user/${id}/plants`)
    .then(res=>{
        dispatch({
            type: GET_SUCCESS, payload: res.data.plants
        });
    })
    .catch(err=>{
        dispatch({
            type: GET_ERROR, payload: JSON.stringify(err)
        })
    })
};

export const addPlant = (id, plant) => (dispatch) => {
    dispatch({type: GET_PLANTS})
    axiosWithAuth()
    .post(`/user/${id}/plants`, plant)
    .then(res => {
        dispatch({
            type: GET_SUCCESS, payload: res.data.plants
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERROR, payload: JSON.stringify(err)
        })
    })
};

export const deletePlant = (uid, plant_id) => (dispatch) => {
    axiosWithAuth()
    .delete(`/user/${uid}/plants/${plant_id}`)
    .then(res => {
        dispatch(getPlants(uid))
    })
    .catch(err => {
        dispatch({
            type: GET_ERROR, payload: JSON.stringify(err)
        })
    })
};

export const updatePlant = (uid, plant_id, changes) => (dispatch) => {
    axiosWithAuth()
    .put(`/user/${uid}/plants/${plant_id}`, changes)
    .then(res => {
        dispatch({
            type: GET_SUCCESS, payload: res.data.plants
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERROR, payload: JSON.stringify(err)
        })
    })
};

export const getUser = (id)=> (dispatch)=>{
    dispatch({type: GET_USER})
    axiosWithAuth()
    .get(`/user/${id}`)
    .then(res=>{
        dispatch({
            type: GET_SUCCESS_USER, payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type: GET_ERROR, payload: JSON.stringify(err)
        })
    })
};

export const updateUser = (id, body) => (dispatch) => {
    axiosWithAuth()
    .put(`/user/${id}`, body)
    .then(res => {
        dispatch({
            type: USER_UPDATE_SUCCESS, payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERROR, payload: JSON.stringify(err.response.data.message)
        })
    })
};

export const loginUser = (formObj, fetchStatus, push) => (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}auth/login`, formObj)
      .then(res => {
        setTimeout(() => {
          fetchStatus(false);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('uid', `${res.data.user_id}`);
          dispatch(getUser(res.data.user_id));
          dispatch(getPlants(res.data.user_id));
          dispatch({type:GET_ERROR, payload: ''});
          push("/");
        },1550);
      })
      .catch(err => {
        fetchStatus(false);
        dispatch({
            type: GET_ERROR, payload: JSON.stringify(err.response.data.message)
        })
      })      
};
