import { GET_USER, GET_SUCCESS_USER, GET_ERROR, USER_UPDATE_SUCCESS } from '../actions';

const initialData = {
    data: {},
    isFetching: false,
    error: ''
};

const reducer = ( state=initialData, action ) => {

    switch(action.type){
        case GET_USER:
            return({
                ...state,
                data: {},
                isFetching: true
            });
        case GET_SUCCESS_USER:
            return({
                ...state,
                isFetching: false,
                data: action.payload
            });
        case USER_UPDATE_SUCCESS:
            return({
                ...state,
                isFetching: false,
                error: '',
                data: action.payload
            });
        case GET_ERROR:
            return({
                ...state,
                isFetching: false,
                error: action.payload 
            });
        default:
            return state;
    }
};
export default reducer;
