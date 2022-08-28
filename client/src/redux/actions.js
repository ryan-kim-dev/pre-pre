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
