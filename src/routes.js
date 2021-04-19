import React from 'react';
import { Redirect } from 'react-router-dom';
import { DashboardLayout } from './layouts/dashboard';
import LoginPage from './pages/login.page';
import HomePage from './pages/home.page';
import SetPassword from './pages/set.password.page';

const routes = [
	{
		path: '/',
		exact: true,
		component: LoginPage
	},
	{
		path: '/set-password/:token',
		exact: true,
		component: SetPassword
	},
	{
		path: '/dashboard',
		component: DashboardLayout,
		routes: [
			{
				path: '/dashboard/home',
				exact: true,
				component: HomePage
			}
		]
	},
	{
		component: () => <Redirect to='/dashboard/home' />
	}
];
export default routes;
