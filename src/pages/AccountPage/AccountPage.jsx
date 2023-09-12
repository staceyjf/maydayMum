import { useState, useEffect } from 'react';
import * as usersAPI from '../../utilities/accounts-api';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import AccountProfile  from '../../components/Account/AccountProfile/AccountProfile';
import AccountProfileDetails from '../../components/Account/AccountProfileDetails/AccountProfileDetails';

function AccountPage({user, setUser}) {
  const [fullUserProfile, setFullUserProfile ] = useState({});
  const [isLoading, setIsLoading] = useState(true); // 

  useEffect(function() {
    async function fetchData() {
      // try {
      //   if (user.role === 'parent') {
      //     setFullUserProfile(user); // need to check if parent needs something extra to create the subdocument
      //   } else {
          const nannyData = await usersAPI.getNannyData();
          setFullUserProfile(nannyData);
      //   }
      //   setIsLoading(false); // FullUserProfile has successfully loaded, render account components
      // } catch (error) { // catch errors and pass back error message 
      //   console.error("Error fetching data:", error);
      //   setIsLoading(false); 
      // }
      setIsLoading(false);
    }
    fetchData();
  }, []);

    return (
      <>
      {isLoading ? (
        <div>Loading...</div> //need to add something in to indicate that this is happening 
      ) : ( // Render the account components when isLoading is false
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
      )}
      </>
    )
   }
   
   export default AccountPage
