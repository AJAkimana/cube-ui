import axios from 'axios';
import { USER_INFO } from './constants';

let user = JSON.parse(localStorage.getItem(USER_INFO));

export const http = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}api/v1`,
	headers: {
		Authorization: user.token || ''
	}
});
