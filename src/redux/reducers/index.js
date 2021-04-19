import { combineReducers } from 'redux';
import {
	loginReducer,
	registerReducer,
	setPasswordReducer,
	usersListReducer
} from './user.reducer';

export default combineReducers({
	login: loginReducer,
	register: registerReducer,
	userList: usersListReducer,
	passwordSet: setPasswordReducer
});
