import { store } from '../store';
import {
	USER_LIST,
	USER_REGISTER,
	USER_SIGNIN,
	USER_SIGNOUT
} from './actionTypes';
import { USER_INFO } from '../../utils/constants';
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
	localStorage.removeItem(USER_INFO);
	store.dispatch({ type: USER_SIGNOUT });
};

export const getUsersList = () => {
	store.dispatch({
		type: USER_LIST,
		payload: http.get('/auth/users')
	});
};
