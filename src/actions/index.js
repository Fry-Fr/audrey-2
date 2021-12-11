import { axiosWithAuth } from "../utilities/axiosCalls";

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
