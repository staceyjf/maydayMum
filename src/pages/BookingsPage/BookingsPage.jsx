import { 
   Box, 
   Container, 
   Stack, 
   Typography, 
   Unstable_Grid2 as Grid 
 } from '@mui/material';
import AccountProfileDetails from '../../components/Account/AccountDetails/AccountProfileDetails';

function BookingsPage({ user, setUser, booking, setBooking }) {
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
                  Bookings
                </Typography>
                <Typography variant="h5">
                  Our wonder {booking.nanny.fullName} is available to book
                </Typography>
              </div>
              <div>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={12}
                    lg={12}
                  >
                    <AccountProfileDetails
                      user={user}
                      setUser={setUser}
                    />
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
      </>
    );
  }
   
export default BookingsPage