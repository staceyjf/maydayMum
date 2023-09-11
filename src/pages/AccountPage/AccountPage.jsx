import { useState, useEffect } from 'react';
import * as usersAPI from '../../utilities/accounts-api';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import AccountProfile  from '../../components/Account/AccountProfile/AccountProfile';
import AccountProfileDetails from '../../components/Account/AccountProfileDetails/AccountProfileDetails';

function AccountPage({user, setUser}) {
  const [fullUserProfile, setFullUserProfile ] = useState({});
  console.log('this is the user being passed in', user);

  useEffect(function() {
    async function fetchData() {
      if (user.role === 'parent') {
        setFullUserProfile(user);
      } else {
        const nannyData = await usersAPI.getNannyData();
        setFullUserProfile(nannyData);
      }
    }
    fetchData();
  }, [user]);


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
                Account Details
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
                  <AccountProfile fullUserProfile={fullUserProfile} setFullUserProfile={setFullUserProfile}/>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <AccountProfileDetails fullUserProfile={fullUserProfile} setFullUserProfile={setFullUserProfile}/>
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
