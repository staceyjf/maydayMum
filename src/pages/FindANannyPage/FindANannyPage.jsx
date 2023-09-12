import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import NannyList from '../../components/FindANanny/NannyList';
// import { SearchBar } from '../../components/FindANanny/SearchBar';

function NannyProfilePage({isLoading, fullUserProfile, setFullUserProfile}) {
  
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
                <Typography variant="h5">
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
                    {/* <AccountProfile fullUserProfile={fullUserProfile} setFullUserProfile={setFullUserProfile}/> */}
                  </Grid>
                  <Grid
                    xs={12}
                    md={8}
                    lg={10}
                  >
                    <NannyList fullUserProfile={fullUserProfile} setFullUserProfile={setFullUserProfile}/>
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