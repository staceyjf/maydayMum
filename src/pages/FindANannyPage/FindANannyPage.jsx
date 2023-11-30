import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NannyList from '../../components/FindANanny/NannyList';
import NannySearch from '../../components/FindANanny/NannySearch';
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
  const navigate = useNavigate();
  const [nannies, setNannies] = useState([]); // all nannies
  const [nanniesForSearchFilter, setNanniesForSearchFilter] = useState({ ...nannies });
  const [isLoading, setIsLoading] = useState(true);
  const formattedDateRange = getFormattedDateRange(); // my 'get week range of dates' function

  useEffect(() => {
    async function fetchAllNannies() {
      try {
        const allNannies = await teamAPI.getAllNannies();
        setNannies(allNannies);
        setNanniesForSearchFilter(allNannies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error with calling all nanny data", error);
      }
    }
  
    async function getBooking() {
      try {
        const userBooking = await teamAPI.createBooking();
        setBooking(userBooking);
      } catch (error) {
        console.error("Error with getting booking data", error);
      }
    }
  
    if (!user) {
      navigate('/users/log-in');
    } else {
        // Retrieve the booking data 
        getBooking();
      // Fetch all nannies regardless of whether the booking exists or not
      fetchAllNannies();
    }
  
  }, [user, navigate]);
  

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
                Find amazing local nannies from across the Northern Beaches for {formattedDateRange}
                </Typography>
              </div>
              <div>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    md={5}
                    lg={3}
                  >
                    <NannySearch 
                      nannies={nannies}
                      booking={booking}
                      setNanniesForSearchFilter={setNanniesForSearchFilter}
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    md={7}
                    lg={9}
                  >
                    <NannyList
                      nanniesForSearchFilter={nanniesForSearchFilter}
                      user={user}
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