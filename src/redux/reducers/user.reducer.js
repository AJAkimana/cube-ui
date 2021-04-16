import { baseState } from '../utils/baseStates';
import { USER_REGISTER, USER_SIGNIN, USER_LIST } from '../actions/actionTypes';
import { pending, fulfilled, rejected } from '../utils/actions';

export const loginReducer = (state = baseState('userInfo', {}), action) => {
	switch (action.type) {
		case pending(USER_SIGNIN): {
			return {
				...state,
				loading: true
			};
		}
		case fulfilled(USER_SIGNIN): {
			return {
				...state,
				loading: false,
				loaded: true,
				userInfo: action.payload.data.data
			};
		}
		case rejected(USER_SIGNIN):
		default:
			return {
				...state,
				loading: false
			};
	}
};
export const registerReducer = (state = baseState('userInfo', {}), action) => {
	switch (action.type) {
		case pending(USER_REGISTER): {
			return {
				...state,
				loading: true
			};
		}
		case fulfilled(USER_REGISTER): {
			return {
				...state,
				loading: false,
				loaded: true,
				userInfo: action.payload.data.data
			};
		}
		case rejected(USER_REGISTER):
		default:
			return {
				...state,
				loading: false
			};
	}
};
export const usersListReducer = (state = baseState('users', []), action) => {
	switch (action.type) {
		case pending(USER_LIST): {
			return {
				...state,
				loading: true
			};
		}
		case fulfilled(USER_LIST): {
			return {
				...state,
				loading: false,
				loaded: true,
				users: action.payload.data.data
			};
		}
		case rejected(USER_LIST):
		default:
			return {
				...state,
				loading: false
			};
	}
};
