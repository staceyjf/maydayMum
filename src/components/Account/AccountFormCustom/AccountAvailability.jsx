import { useState } from 'react';
import { updateToken } from '../../../utilities/users-service';
import { getFormattedDateRange } from '../../../utilities/date-utils'; 
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

function AccountAvailability({ user, setUser }) {
  const [userData, setUserData] = useState({ ...user });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const formattedDateRange = getFormattedDateRange(); // my get week range ()
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  function handleCheckedChange(evt) {
    // handles nanny availability checkboxes
    const updatedUser = {
      ...userData.weeklyAvailability,
      [evt.target.name]: evt.target.checked,
    };

    setUserData({
      ...userData,
      weeklyAvailability: updatedUser,
      error: '',
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const userUpdate = await updateToken(userData);
      console.log(userUpdate);
      setUser(userUpdate);
      setSuccessMessage('Details successfully saved. '); // Updating the user that their details have been saved
      setTimeout(() => {
        // Clear the success message
        setSuccessMessage('');
      }, 3000);
    } catch {
      setError('Update failed - please try again');
    }
  }

  return (
      <Box mt={2}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardHeader title={`Availability for ${formattedDateRange}`} />
            <CardHeader subheader="Select your weekly availability" style={{ textAlign: 'left' }} />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                <Grid xs={12} md={12} sx={{ textAlign: 'left', padding: 0 }}>
                  <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormGroup>
                      {daysOfWeek.map((day) => (
                        <FormControlLabel
                          key={day}
                          control={
                            <Checkbox
                              name={day} // Removed quotes around day
                              checked={userData.weeklyAvailability[day]}
                              onChange={handleCheckedChange}
                            />
                          }
                          label={day}
                        />
                      ))}
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
  );
}

export default AccountAvailability;
