import { store } from '../store';
import {
	SET_PASSWORD,
	USER_LIST,
	USER_REGISTER,
	USER_SIGNIN,
	USER_SIGNOUT
} from './actionTypes';
import { http } from '../../utils/http';

export const signin = (userInfo) => {
	store.dispatch({
		type: USER_SIGNIN,
		payload: http.post('/auth/login', userInfo)
	});
};
export const registerUser = (userInfo) => {
	store.dispatch({
		type: USER_REGISTER,
		payload: http.post('/user/register', userInfo)
	});
};
export const signout = () => {
	store.dispatch({ type: USER_SIGNOUT });
};

export const getUsersList = () => {
	store.dispatch({
		type: USER_LIST,
		payload: http.get('/auth/users')
	});
};
export const setPassword = (credentials) => {
	store.dispatch({
		type: SET_PASSWORD,
		payload: http.patch('/auth/set-password', credentials)
	});
};
