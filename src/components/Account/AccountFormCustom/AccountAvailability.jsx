import { useState } from 'react';
import { updateNannyAvailability } from '../../../utilities/accounts-api';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, FormHelperText, FormGroup, Typography, Unstable_Grid2 as Grid } from '@mui/material';

function AccountAvailability({nannyAvailsData, setNannyAvailsData}) {
  // console.log('this is target.name', evt.target.name)
  // console.log('this is target checked', evt.target.checked)
  const [userData, setUserData] = useState({ ...nannyAvailsData });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  console.log('this is the logged in nannys availability data', userData);

  function handleAvailabilityChange(evt) {
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.checked,
      error: '',
    });
  }

  async function handleAvailabilitySubmit(evt) {
    evt.preventDefault();
    try {
      const Availability = await updateNannyAvailability(userData);
      setNannyAvailsData(Availability);
      setSuccessMessage('Details successfully saved.');
    } catch {
      setError('Update failed - please try again');
    }
  }

  return (
    <>
     <Box mt={2}> 
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleAvailabilitySubmit}
      >
        <Card  >
          <CardHeader title="Weekly Availability" />
          <CardHeader subheader="Select your weekly availability" style={{ textAlign: 'left' }} />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid xs={12} md={12} sx={{ textAlign: 'left', padding: 0 }}>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Monday'
                          checked={userData.Monday}
                          onChange={handleAvailabilityChange}
                        />
                      }
                      label='Monday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Tuesday'
                          checked={userData.Tuesday}
                          onChange={handleAvailabilityChange}
                        />
                      }
                      label='Tuesday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Wednesday'
                          checked={userData.Wednesday}
                          onChange={handleAvailabilityChange}
                        />
                      }
                      label='Wednesday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Thursday'
                          checked={userData.Thursday}
                          onChange={handleAvailabilityChange}
                        />
                      }
                      label='Thursday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Friday'
                          checked={userData.Friday}
                          onChange={handleAvailabilityChange}
                        />
                      }
                      label='Friday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Saturday'
                          checked={userData.Saturday}
                          onChange={handleAvailabilityChange}
                        />
                      }
                      label='Saturday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Sunday'
                          checked={userData.Sunday}
                          onChange={handleAvailabilityChange}
                        />
                      }
                      label='Sunday'
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="h6">
              {successMessage}
              {error}
            </Typography>
            <Button type="submit" variant="contained">
              UPDATE
            </Button>
          </CardActions>
        </Card>
      </form>
      </Box>
    </>
  );
}

export default AccountAvailability;