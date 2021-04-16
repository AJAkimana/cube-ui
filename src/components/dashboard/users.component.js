import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useSelector } from 'react-redux';
import LoadingBox from '../loading.component';
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import { getUsersList } from '../../redux/actions/user';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#8967fc',
		color: theme.palette.common.white,
		fontSize: 16
	},
	body: {
		fontSize: 16
	}
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover
		}
	}
}))(TableRow);

const StyleButton = withStyles((theme) => ({
	root: {
		color: '#8967fc',
		float: 'right',
		fontSize: 14,
		'&:hover': {
			backgroundColor: 'none',
			color: 'none',
			BorderColor: 'none'
		}
	}
}))(Button);

const useStyles = makeStyles({
	table: {
		width: '100%'
	}
});

export default function Users() {
	const classes = useStyles();
	const userList = useSelector((state) => state.userList);
	const { loading, users } = userList;
	useEffect(() => {
		getUsersList();
	}, []);
	return (
		<TableContainer component={Paper}>
			<h1>Users</h1>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : (
				<Table className={classes.table} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell>NAME</StyledTableCell>
							<StyledTableCell>EMAIL</StyledTableCell>
							<StyledTableCell>TELEPHONE</StyledTableCell>
							<StyledTableCell>COMPANY NAME</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.slice(0, 5).map((user) => (
							<StyledTableRow key={user._id}>
								<StyledTableCell>{user.fullName}</StyledTableCell>
								<StyledTableCell>{user.email}</StyledTableCell>
								<StyledTableCell>{user.phoneNumber}</StyledTableCell>
								<StyledTableCell>{user.companyName}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			)}
			<Box
				sx={{
					p: 2
				}}
			>
				<StyleButton endIcon={<ArrowRightIcon />}>View All</StyleButton>
			</Box>
		</TableContainer>
	);
}
