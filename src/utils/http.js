import axios from 'axios';
import env from 'react-dotenv';
import { USER_INFO } from './constants';

let user = JSON.parse(localStorage.getItem(USER_INFO));

export const http = axios.create({
	baseURL: `${env.API_URL}/api/v1`,
	withCredentials: true,
	headers: {
		Authorization: user.token || ''
	}
});
