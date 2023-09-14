import { useState, useEffect } from 'react'
import * as teamAPI from '../../utilities/team-api';
import NannyList from '../../components/FindANanny/NannyList';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// import { SearchBar } from '../../components/FindANanny/SearchBar';

function NannyProfilePage({nannyAvailsData}) {
  const [nannies, setNannies ] = useState([]); // all nannies
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(function () {
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
    }, []);

    return (
      <>
      {isLoading 
      ? ( <div>Loading...</div> ) //need to add something in to indicate that this is happening 
      : ( // Render the account components when isLoading is false
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
                <Typography variant="h4">
                  Find Amazing Local Nannies across the Northern Beaches
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
   
   export default NannyProfilePage