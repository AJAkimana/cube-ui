import Axios from 'axios';
import env from 'react-dotenv';
import {
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_SIGNIN_FAIL,
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_SIGNOUT,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL
} from '../constants/login.constant';

export const register = (
	fullName,
	email,
	phoneNumber,
	companyName,
	address
) => async (dispatch) => {
	dispatch({
		type: USER_REGISTER_REQUEST,
		payload: { fullName, email, phoneNumber, companyName, address }
	});
	try {
		const { data } = await Axios.post(`${env.API_URL}user/register`, {
			fullName,
			email,
			phoneNumber,
			companyName,
			address
		});
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const signin = (email, password) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
	try {
		const { data } = await Axios.post(`${env.API_URL}api/v1/auth/login`, {
			email,
			password
		});
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_SIGNIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const signout = () => (dispatch) => {
	localStorage.removeItem('userInfo');
	dispatch({ type: USER_SIGNOUT });
};

export const listUsers = () => async (dispatch, getState) => {
	dispatch({ type: USER_LIST_REQUEST });
	try {
		const {
			userSignin: { userInfo }
		} = getState();
		const { data } = await Axios.get(`${env.API_URL}auth/users`, {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		});
		dispatch({ type: USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		dispatch({ type: USER_LIST_FAIL, payload: message });
	}
};
