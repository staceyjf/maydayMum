import { useState, useEffect, useRef } from 'react';
import * as usersAPI from '../../../utilities/users-api';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import AccountProfile  from '../../components/Account/AccountProfile/AccountProfile';
import AccountProfileDetails from '../../components/Account/AccountProfileDetails/AccountProfileDetails';

function AccountPage({user, setUser}) {
  const [nanny, setNanny ] = useState({});
  const [parent, setParent ] = useState({});

  useEffect(function() {

    async function getNannyData() {
      const nanny = await usersAPI.getNannyData();
      setNanny(nanny);
    }
    getNannyData();

    // async function getParentData() {
    //   const items = await itemsAPI.getAll();
    //   categoriesRef.current = [...new Set(items.map(item => item.category.name))];
    //   setMenuItems(items);
    //   setActiveCat(categoriesRef.current[0]);
    // }
    // getParentData();

  }, []);

    return (
      <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Account
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <AccountProfile nanny={nanny} setNanny={setNanny}/>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <AccountProfileDetails />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
    )
   }
   
   export default AccountPage
