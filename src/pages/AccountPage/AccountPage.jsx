import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import AccountProfile  from '../../components/Account/AccountProfile/AccountProfile';
import AccountProfileDetails from '../../components/Account/AccountDetails/AccountProfileDetails';
import AccountAvailability from '../../components/Account/AccountFormCustom/AccountAvailability';

function AccountPage({user, setUser, isLoading}) {
  // console.log('this is the account page user', user);

  return (
    <>
    {isLoading 
    ? ( <div>Loading...</div> ) //need to add something in to indicate that this is happening 
    : ( // Render the account components when isLoading is false
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
                  <AccountProfile 
                    user={user} 
                  />
                  {/* conditionally render nanny avaibility  */}
                  {/* {user.role === 'nanny' && (
                    <AccountAvailability
                      nannyAvailsData={nannyAvailsData}
                      setNannyAvailsData={setNannyAvailsData}
                    />
                  )} */}
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <AccountProfileDetails 
                    user={user} 
                    setUser={setUser}
                  />
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
