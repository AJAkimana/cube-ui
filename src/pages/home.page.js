import React from 'react';
import Registration from '../components/dashboard/register.component';
import Invoices from '../components/dashboard/invoices.component';
import TotalCustomers from '../components/dashboard/customers.component';
import TotalProjects from '../components/dashboard/count.projects.component';
import Users from '../components/dashboard/users.component';
import TotalQuotes from '../components/dashboard/quotes.component';
import {
    Box,
    Container,
    Grid,
  } from '@material-ui/core';

export default function HomePage() {
    return (
    <Box
      sx={{
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Invoices />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProjects />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalQuotes />
          </Grid>
          <Grid
            item
            lg={5}
            md={9}
            xl={6}
            xs={12}
          >
            <Registration />
          </Grid>
          <Grid
            item
            lg={7}
            md={9}
            xl={6}
            xs={12}
          >
            <Users />
          </Grid>
        </Grid>
      </Container>
    </Box>
    )
}