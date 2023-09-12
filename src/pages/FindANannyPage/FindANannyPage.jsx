import { useState, useEffect } from 'react';
import * as usersAPI from '../../utilities/accounts-api';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// import { NannyList } from '../../components/FindANanny/NannyList';
// import { SearchBar } from '../../components/FindANanny/SearchBar';

const now = new Date();

function NannyProfilePage({user, setUser}) {
  const [fullUserProfile, setFullUserProfile ] = useState({});

    return (
      <>
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
                    {/* <AccountProfile fullUserProfile={fullUserProfile} setFullUserProfile={setFullUserProfile}/> */}
                  </Grid>
                  <Grid
                    xs={12}
                    md={6}
                    lg={8}
                  >
                    {/* <AccountProfileDetails fullUserProfile={fullUserProfile} setFullUserProfile={setFullUserProfile}/> */}
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </Container>
        </Box>
      </>
    )
  }
   
   export default NannyProfilePage