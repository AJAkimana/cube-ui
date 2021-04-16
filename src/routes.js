import React from 'react';
import { Redirect } from 'react-router-dom';
import { DashboardLayout } from './layouts/dashboard';
import LoginPage from './pages/login.page';
import HomePage from './pages/home.page';

const routes = [
	{
		path: '/',
		exact: true,
		component: LoginPage
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
	}
];
export default routes;
