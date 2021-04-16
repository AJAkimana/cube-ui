import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/loading.component';
import Logo from '../assets/ari_cube.png';
import { signin, setPassword } from '../redux/actions/user';

const initialState = { password: '', confirmPassword: '' };
const SetPassword = (props) => {
	const [credentials, setCredentials] = useState(initialState);

	const redirect = '/';
	const { loaded, loading } = useSelector((state) => state.passwordSet);
	useEffect(() => {
		if (loaded) {
			props.history.replace(redirect);
		}
	}, [props.history, redirect]);
	const onHandleChange = (e) => {
		e.preventDefault();
		const {
			target: { name, value }
		} = e;
		setCredentials({ ...credentials, [name]: value });
	};
	const submitHandler = (e) => {
		e.preventDefault();
		delete credentials.confirmPassword;
		credentials.token = props.match.params.token;
		setPassword(credentials);
	};
	const { password, confirmPassword } = credentials;
	return (
		<div>
			<form className='form' onSubmit={submitHandler}>
				<div>
					<img src={Logo} alt='#' className='logo' />
				</div>
				<div>
					<h1>Set a new password</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				<div>
					<label htmlFor='pasword'>New Password</label>
					<input
						type='password'
						id='password'
						name='password'
						placeholder='Enter password'
						required
						onChange={onHandleChange}
						value={credentials.password}
					></input>
				</div>
				<div>
					<label htmlFor='confirmPassword'>Confirm password</label>
					<input
						type='confirmPassword'
						name='confirmPassword'
						id='confirmPassword'
						placeholder='Confirm password'
						required
						onChange={onHandleChange}
						value={credentials.confirmPassword}
					></input>
				</div>
				<div>
					<label />
					<button className='primary' type='submit'>
						Set password
					</button>
				</div>
			</form>
		</div>
	);
};
export default SetPassword;
