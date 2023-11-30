import { 
   Box, 
   Container, 
   Stack, 
   Typography, 
   Unstable_Grid2 as Grid 
 } from '@mui/material';
import BookingForm from '../../components/Bookings/BookingForm';

function BookingsPage({ user, setUser, booking, setBooking }) {

   return (
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
                <Typography variant="h3" style={{ textTransform: 'uppercase' }}>
                  Book a Night Nanny Form
                </Typography>
                <Typography variant="h5">
                 Please complete the below booking form to secure your chosen nanny.
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
                    <BookingForm
                      user={user}
                      setUser={setUser}
                      booking={booking}
                      setBooking={setBooking}
                    />
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </Container>
        </Box>
    );
  }
   
export default BookingsPage