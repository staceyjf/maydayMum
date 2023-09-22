import { useState } from 'react'
import { updateUser } from '../../../utilities/accounts-api';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Divider, 
  FormControl, FormControlLabel, FormGroup, Typography, Unstable_Grid2 as Grid } from '@mui/material';

function AccountAvailability({user, setUser}) {
  const [userData, setUserData] = useState({...user});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleCheckedChange(evt) { // handles nanny user checkboxes (will need a seperate one for avaibility)
  const updatedUser = {
      ...userData.weeklyAvailability,
      [evt.target.name]: evt.target.checked,
    }

  setUserData({
    ...userData,
    parent: updatedUser,
    error: ''
  });
};

async function handleSubmit(evt) { 
  evt.preventDefault(); 
  try { 
    const userUpdate = await updateUser(userData);
    // console.log('this is userUpdate', userUpdate)
    setUser(userUpdate);
    // console.log('this is userData', userData);  
    // console.log('this is user', user);  
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
                          checked={userData.Monday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Monday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Tuesday'
                          checked={userData.Tuesday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Tuesday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Wednesday'
                          checked={userData.Wednesday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Wednesday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Thursday'
                          checked={userData.Thursday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Thursday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Friday'
                          checked={userData.Friday}
                          onChange={handleCheckedChange}
                        />
                      }
                      label='Friday'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name='Saturday'
                          checked={userData.Saturday}
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