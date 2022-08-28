import axios from 'axios';
import * as types from './actionTypes';

export const loginUser = dataToSubmit => {
  const request = axios
    .post('/api/users/login', dataToSubmit)
    .then(response => response.data);

  return {
    type: types.LOGIN_USER,
    payload: request,
  };
};

export const newUser = dataToSubmit => {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then(response => response.data);

  return {
    type: types.NEW_USER,
    payload: request,
  };
};

export const logoutUser = () => {
  const request = axios
    .get('/api/users/logout')
    .then(response => response.data);

  return {
    type: types.LOGOUT_USER,
    payload: request,
  };
};
