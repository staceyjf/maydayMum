import { useState, useEffect } from 'react';
import NannyList from '../../components/FindANanny/NannyList';
import { getFormattedDateRange } from '../../utilities/date-utils'; 
import { 
  Box, 
  Container, 
  Stack, 
  Typography, 
  Unstable_Grid2 as Grid 
} from '@mui/material';
import * as teamAPI from '../../utilities/team-api';

function NannyProfilePage({ user, booking, setBooking }) {
  const [nannies, setNannies] = useState([]); // all nannies
  const [isLoading, setIsLoading] = useState(true);
  const formattedDateRange = getFormattedDateRange(); // my get week range ()

  useEffect(function() {
    async function fetchAllNannies() {
      try {
        const allNannies = await teamAPI.getAllNannies();
        setNannies(allNannies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error with calling all nanny data", error);
      }
    }
    fetchAllNannies();

    async function getBooking() {
      const userBooking = await teamAPI.getBooking();
      setBooking(userBooking);
      console.log("Booking:", userBooking);
    }

    getBooking();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        // Render the account components when isLoading is false
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            paddingTop: 8
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <div>
              <Typography variant="h3" style={{ textTransform: 'uppercase' }}>
                Night Nanny Availability 
              </Typography>
                <Typography variant="h5">
                Find amazing Local Nannies across the Northern Beaches for {formattedDateRange}
                </Typography>
              </div>
              <div>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={4}
                    lg={2}
                  >
                    {/* <AccountProfile 
                    fullUserProfile={fullUserProfile} 
                    setFullUserProfile={setFullUserProfile}/> */}
                  </Grid>
                  <Grid
                    xs={12}
                    md={8}
                    lg={10}
                  >
                    <NannyList
                      nannies={nannies}
                      user={user}
                      booking={booking}
                      setBooking={setBooking}
                    />
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
}

export default NannyProfilePage;