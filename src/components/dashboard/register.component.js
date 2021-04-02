import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/login.actions';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import LoadingBox from '../loading.component';
import MessageBox from '../message.component';

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#8967fc',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(2),
      color: 'black',
      fontSize: 16,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#8967fc',
      borderRadius: 5,
        float: 'left',
        maxWidth: '100%',
        color: 'white',
        fontSize: 16,
        '&:hover': {
          backgroundColor: '#8967fc',
          color: '#FFFFFF'
        }
    },
  }));

export default function Registration(props) {
  const classes = useStyles();
  const [fullName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  console.log(userInfo);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(fullName, email, phoneNumber, companyName, address));
  }
  return (
    <Container component='main' fontSize='26px'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h4'>
            REGISTER USER
        </Typography>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='fullName'
                variant='outlined'
                fullWidth
                id='fullName'
                label='Full Name'
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="phoneNumber"
                id="phoneNumber"
                autoComplete="phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="companyName"
                    label="Company Name"
                    type="companyName"
                    id="companyName"
                    autoComplete="Company Name"
                    onChange={(e) => setCompanyName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="address"
                    label="Your Address"
                    type="address"
                    id="address"
                    autoComplete="address"
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            SUBMIT
          </Button>
        </form>
      </div>
    </Container>
  );
}
