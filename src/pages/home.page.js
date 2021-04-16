import React from 'react';
import Registration from '../components/dashboard/register.component';
import Users from '../components/dashboard/users.component';
import { Grid, Box } from '@material-ui/core';

export default function HomePage(props) {
	return (
		<Box
			sx={{
				backgroundColor: 'background.default',
				minHeight: '100%',
				py: 3
			}}
		>
			<Grid container spacing={3}>
				<Grid item lg={5} md={9} xl={6} xs={12}>
					<Registration />
				</Grid>
				<Grid item lg={7} md={9} xl={6} xs={12}>
					<Users />
				</Grid>
			</Grid>
		</Box>
	);
}
