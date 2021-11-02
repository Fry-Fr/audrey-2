import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    return axios.create({
        baseURL:'https://ptpt-watermyplants-5.herokuapp.com/',
        headers: {
            Authorization: token
        }
    });
};
