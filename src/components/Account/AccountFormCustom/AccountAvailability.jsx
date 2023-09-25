import { useState } from 'react'
import { updateToken } from '../../../utilities/users-service';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Divider, 
  FormControl, FormControlLabel, FormGroup, Typography, Unstable_Grid2 as Grid } from '@mui/material';

function AccountAvailability({user, setUser}) {
  const [userData, setUserData] = useState({...user});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleCheckedChange(evt) { // handles nanny user checkboxes (will need a seperate one for avaibility)
    // console.log('this is target.name', evt.target.name)
    // console.log('this is target checked', evt.target.checked)    

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
    console.log(userData);
    const userUpdate = await updateToken(userData);
    console.log('this is userUpdate', userUpdate)
    setUser(userUpdate);  
    setSuccessMessage('Details successfully saved. '); // Updating the user that their details have been saved
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
                          checked={userData.Sunday}
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