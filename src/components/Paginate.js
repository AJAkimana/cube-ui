import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import ReactPaginate from 'react-paginate';

const useStyles = makeStyles((theme) => ({
	root: {
		...theme.typography.button,
		listStyle: 'none',
		userSelect: 'none',
		display: 'flex',
		alignItems: 'center'
	},
	active: {},
	activeLink: {},
	break: {},
	breakLink: {},
	disabled: {},
	next: {
		marginLeft: theme.spacing(1)
	},
	nextLink: {
		padding: '6px 16px',
		outline: 'none',
		cursor: 'pointer',
		borderRadius: 4,
		'&:hover': {
			backgroundColor: colors.blueGrey[50]
		}
	},
	page: {},
	pageLink: {
		color: theme.palette.text.secondary,
		padding: theme.spacing(1),
		outline: 'none',
		cursor: 'pointer',
		width: 40,
		height: 40,
		borderRadius: '50%',
		display: 'block',
		textAlign: 'center',
		'&:hover': {
			backgroundColor: colors.blueGrey[50],
			color: theme.palette.text.primary
		},
		'&$activeLink': {
			backgroundColor: colors.blueGrey[50],
			color: theme.palette.text.primary
		}
	},
	previous: {
		marginRight: theme.spacing(1)
	},
	previousLink: {
		padding: '6px 16px',
		outline: 'none',
		cursor: 'pointer',
		borderRadius: 4,
		'&:hover': {
			backgroundColor: colors.blueGrey[50]
		}
	}
}));

export const Paginate = ({
	pageCount = 0,
	pageRangeDisplayed = 2,
	marginPagesDisplayed = 1,
	onPageChange,
	className,
	...rest
}) => {
	const classes = useStyles();

	return (
		pageCount > 0 && (
			<ReactPaginate
				activeClassName={classes.active}
				activeLinkClassName={classes.activeLink}
				breakClassName={classes.break}
				breakLabel='...'
				breakLinkClassName={classes.breakLink}
				containerClassName={classes.root}
				disabledClassName={classes.disabled}
				marginPagesDisplayed={marginPagesDisplayed}
				nextClassName={classes.next}
				nextLabel='next'
				nextLinkClassName={classes.nextLink}
				onPageChange={onPageChange}
				pageClassName={classes.page}
				pageCount={pageCount}
				pageLinkClassName={classes.pageLink}
				pageRangeDisplayed={pageRangeDisplayed}
				previousClassName={classes.previous}
				previousLabel='previous'
				previousLinkClassName={classes.previousLink}
				subContainerClassName='pages pagination'
				{...rest}
			/>
		)
	);
};
