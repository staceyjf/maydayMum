import { useState } from 'react';
import { updateNannyProfile } from '../../../utilities/accounts-api';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, 
  Divider, FormControlLabel, TextField, Typography, Unstable_Grid2 as Grid } from '@mui/material';

function AccountNannyProfileDetails({fullUserProfile, setFullUserProfile}) {
  const [userData, setUserData] = useState({...fullUserProfile});
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');
  // console.log(userData)

  function handleUserChange(evt) { // handles user document
    const updatedUser = {
      ...userData.user,
      [evt.target.name]: evt.target.value
    };
  
    setUserData({
      ...userData,
      user: updatedUser,
      error: ''
    });
  };
  
  function handleChange(evt) { // handles nanny document
    setUserData({ 
        ...userData, 
        [evt.target.name]: evt.target.value,
        error:'' 
    });    
  };

  function handleCheckedChange(evt) { // handles nanny checkboxes
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.checked,
      error: '',
    });
  };
  
  async function handleSubmit(evt) { 
    evt.preventDefault(); 
    try { 
      const user = await updateNannyProfile(userData);
      setFullUserProfile(user);
      setSuccessMessage('Details successfully saved. '); // Updating the user that their details have been saved
    } catch { 
      setError('Update failed - please try again'); 
    } 
  };

  return (
    <>
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          title="Profile"
          subheader="Edit details where needed"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={handleUserChange}
                  required
                  value={userData.user.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="surname"
                  onChange={handleUserChange}
                  required
                  value={userData.user.surname}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleUserChange}
                  required
                  value={userData.user.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={handleUserChange}
                  value={userData.user.phoneNumber}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
                <TextField
                  fullWidth
                  label="Address"
                  name="location"
                  onChange={handleUserChange}
                  required
                  value={userData.user.location}
                />
              </Grid>
              <Grid xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isFirstAidCertified"
                    checked={userData.isFirstAidCertified} // set the value of checked
                    onChange={handleCheckedChange} // runs specific change function
                  />
                }
                label="First Aid Certified"
              />
              </Grid>
              <Grid xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isWccCleared"
                    checked={userData.isWccCleared} // set the value of checked
                    onChange={handleCheckedChange} // runs specific change function
                  />
                }
                label="WWC Cleared"
              />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  id="standard-adornment-amount"
                  label="Nightly Rate in $"
                  name="nightRate"
                  onChange={handleChange}
                  required
                  value={userData.nightRate}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Typography variant="h6">
          {successMessage}
          </Typography>
          <Button type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
    </>
)};

export default AccountNannyProfileDetails

{/* <Grid
  xs={12}
  md={6}
>
  <TextField
    fullWidth
    label="First Aid Certified"
    name="isFirstAidCertified"
    onChange={handleChange}
    required
    select
    SelectProps={{ native: true }}
    value={userData.isFirstAidCertified} 
  >
    {childrenCount.map((option) => (
      <option
        key={option}
        value={option}
      >
        {option}
      </option>
    ))}
  </TextField>
</Grid> */}