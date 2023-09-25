import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import AccountProfile  from '../../components/Account/AccountProfile/AccountProfile';
import AccountProfileDetails from '../../components/Account/AccountDetails/AccountProfileDetails';
import AccountAvailability from '../../components/Account/AccountFormCustom/AccountAvailability';

function AccountPage({user, setUser, updateUserState}) {
  console.log('this is user on the account page', user);

  return (
    <>
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
                  />
                  {/* conditionally render nanny avaibility  */}
                  {user.role === 'nanny' && (
                    <AccountAvailability
                      user={user}
                      setUser={setUser}
                      updateUserState={updateUserState}
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
                    updateUserState={updateUserState}
                  />
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