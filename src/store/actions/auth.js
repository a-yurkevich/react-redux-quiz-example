import axios from 'axios';
import {serverUrl} from '../../config';
import {getState} from 'redux';
import {AUTH_LOGOUT, AUTH_SUCCESS} from './actionsType';

// Auth uses email instead token only for example
export function auth(email, password, isLogin) {
  return async (dispatch, getState) => {
    if (!isLogin) {
      try {
        const user = await axios.get(`${serverUrl}/users?email=${email}`);
        if (user.data.length) {
          alert('Email already in use');
        } else {
          const authData = {
            email,
            password
          };
          const response = await axios.post(`${serverUrl}/users`, authData);
          const expirationDate = new Date(new Date().getTime());
          window.localStorage.setItem('user', JSON.stringify(response.data.email));
          window.localStorage.setItem('expirationDate', expirationDate);
          console.log(response);
        }

      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const authData = {
          email,
          password
        };
        const response = await axios.get(`${serverUrl}/users`, authData);
        const expirationDate = new Date(new Date().getTime());
        console.log(response);
        if (response.data.length) {
          window.localStorage.setItem('user', JSON.stringify(response.data[0].email));
          window.localStorage.setItem('expirationDate', expirationDate);
        } else {
          alert('error');
        }
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(authSuccess(email));
  }
}

export function logout() {
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

// Need token. Email only for example
export function authSuccess(email) {
  return {
    type: AUTH_SUCCESS,
    token: email
  }
}

export function autoLogin() {
  return dispatch => {
    const token = window.localStorage.getItem('user');
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(window.localStorage.getItem('expirationDate'));
      // if (expirationDate <= new Date()) {
      //
      // }
      if (expirationDate) {
        dispatch(authSuccess(token));
        // dispatch(authLogout(token));
      }

    }
  }
}
