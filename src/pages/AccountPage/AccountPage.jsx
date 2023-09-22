import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import AccountProfile  from '../../components/Account/AccountProfile/AccountProfile';
import AccountProfileDetails from '../../components/Account/AccountDetails/AccountProfileDetails';
import AccountAvailability from '../../components/Account/AccountFormCustom/AccountAvailability';

function AccountPage({nannyAvailsData, setNannyAvailsData, user, setUser, isLoading}) {
  console.log('this is user on the account page', user);

  return (
    <>
    {isLoading 
    ? ( <div>Loading...</div> ) 
    : ( 
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
            <Typography variant="h3">
              Account Details
            </Typography>
            <Typography variant="h5">
              Manage your personal information and account settings.
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
                    setUser={setUser}
                  />
                  {/* conditionally render nanny avaibility  */}
                  {user.role === 'nanny' && (
                    <AccountAvailability
                      nannyAvailsData={nannyAvailsData}
                      setNannyAvailsData={setNannyAvailsData}
                    />
                  )}
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