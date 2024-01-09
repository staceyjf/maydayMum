import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NannyList from '../../components/FindANanny/NannyList';
import NannySearch from '../../components/FindANanny/NannySearch';
import PageControls from '../../components/FindANanny/PageControls';
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
  const [nanniesForSearchFilter, setNanniesForSearchFilter] = useState({ ...nannies }); // stores the result of user filtering
  const [paginatedNannies, setPaginatedNannies] = useState([]); // This state will store the paginated subset of nannies
  const [isLoading, setIsLoading] = useState(true);
  const formattedDateRange = getFormattedDateRange(); // my 'get week range of dates' function
  const [currentPage, setCurrentPage] = useState(1); // holds the current page
  const itemsPerPage = 10; // controls number per a page

  console.log(nanniesForSearchFilter)


  // filter and sort nanny data plus getBooking.
  useEffect(() => {
       // Check for user existence
       if (!user) {
        navigate('/users/log-in');
        return; // Exit early if there is no user
      }

    async function fetchAllNannies() {
      try {
        const allNannies = await teamAPI.getAllNannies(); //send the page as a query param
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

    getBooking();
    fetchAllNannies(); 
    
  }, [user]);
  
  // handle pagination for nannies
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedNannies = nanniesForSearchFilter.slice(startIndex, endIndex);
    setPaginatedNannies(slicedNannies);
  }, [nanniesForSearchFilter, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
                      setNanniesForSearchFilter={handleSearchResults}
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    md={7}
                    lg={9}
                  >
                    <NannyList
                      nanniesForSearchFilter={paginatedNannies} //update with results limited to pagination logic
                      user={user}
                      setBooking={setBooking}
                    />
                    <PageControls
                        currentPage={currentPage}
                        totalPages={Math.ceil(nanniesForSearchFilter.length / itemsPerPage)}
                        onPageChange={handlePageChange}
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