import { store } from '../store';
import { USER_REGISTER, USER_SIGNIN, USER_SIGNOUT } from './actionTypes';
import { USER_INFO } from '../../utils/constants';

export const signin = (userInfo) => {
	store.dispatch({
		type: USER_SIGNIN,
		payload: http.post('/auth/login', userInfo)
	});
};
export const register = (userInfo) => {
	store.dispatch({
		type: USER_REGISTER,
		payload: http.post('/user/register', userInfo)
	});
};
export const signout = () => {
	localStorage.removeItem(USER_INFO);
	store.dispatch({ type: USER_SIGNOUT });
};

export const listUsers = () => {
	store.dispatch({
		type: USER_LIST_REQUEST,
		payload: http.get('/auth/users')
	});
};
