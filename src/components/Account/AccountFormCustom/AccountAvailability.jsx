import { useState } from 'react'
import { updateToken } from '../../../utilities/users-service';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Divider, 
  FormControl, FormControlLabel, FormGroup, Typography, Unstable_Grid2 as Grid } from '@mui/material';

function AccountAvailability({user, setUser}) {
  const [userData, setUserData] = useState({...user});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  // Date header
  const options = { weekday: 'short', day: 'numeric', month: 'short' };

  function getWeek() {
    const now = new Date();  // create  a new day object
    const currentDay = now.getDay(); // gets the current day eg Sunday reps 0

    const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1; // Calculate the start of the week
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - daysUntilMonday);
    startOfWeek.setHours(0, 0, 0, 0); // Monday starts from 

    const daysUntilSunday = currentDay === 0 ? 0 : 7 - currentDay; // Calculate the end of the  week
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + daysUntilSunday);
    endOfWeek.setHours(23, 59, 59, 999); // Sunday ends at

    return { startOfWeek, endOfWeek };
  }

  const { startOfWeek, endOfWeek } = getWeek();
  const dateTimeFormat = new Intl.DateTimeFormat('en', options);
  const formattedStartDate = dateTimeFormat.format(startOfWeek);
  const formattedEndDate = dateTimeFormat.format(endOfWeek);
  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;


  function handleCheckedChange(evt) { // handles nanny avals checkboxes
    const updatedUser = {
      ...userData.weeklyAvailability,
      [evt.target.name]: evt.target.checked
    };
    
    setUserData({
      ...userData,
      weeklyAvailability: updatedUser,
      error: ''
    });
  };
  
  async function handleSubmit(evt) { 
    evt.preventDefault(); 
    try { 
      const userUpdate = await updateToken(userData);
      console.log(userUpdate);
      setUser(userUpdate); 
      setSuccessMessage('Details successfully saved. '); // Updating the user that their details have been saved
      setTimeout(() => {   // Clear the success message
        setSuccessMessage('');
      }, 3000); 
    } catch { 
      setError('Update failed - please try again'); 
    } 
  };

  return (
    <>
     <Box mt={2}> 
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Card  >
          <CardHeader title={`Availability for ${formattedDateRange}`} />
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
                          checked={userData.weeklyAvailability.Monday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Monday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Tuesday'
                          checked={userData.weeklyAvailability.Tuesday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Tuesday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Wednesday'
                          checked={userData.weeklyAvailability.Wednesday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Wednesday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Thursday'
                          checked={userData.weeklyAvailability.Thursday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Thursday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Friday'
                          checked={userData.weeklyAvailability.Friday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Friday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Saturday'
                          checked={userData.weeklyAvailability.Saturday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Saturday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Sunday'
                          checked={userData.weeklyAvailability.Sunday}
                          onChange={handleCheckedChange}
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