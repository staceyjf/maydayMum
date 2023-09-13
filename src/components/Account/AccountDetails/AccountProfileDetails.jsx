import { useState } from 'react';
import AccountProfileNannyEl from '../AccountFormCustom/AccountProfileNannyEl';
import AccountAvailability from '../AccountFormCustom/AccountAvailability';
import AccountProfileParentEl from '../AccountFormCustom/AccountProfileParentEl';
import { updateNannyProfile, updateParentProfile } from '../../../utilities/accounts-api';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, 
  Typography, Unstable_Grid2 as Grid } from '@mui/material';

function AccountProfileDetails({fullUserProfile, setFullUserProfile}) {
  const [userData, setUserData] = useState({...fullUserProfile});
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');

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
  
  function handleChange(evt) { // handles nanny/parent document
    setUserData({ 
        ...userData, 
        [evt.target.name]: evt.target.value,
        error:'' 
    });    
  };

  function handleCheckedChange(evt) { // handles nanny user checkboxes (will need a seperate one for avaibility)
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.checked,
      error: '',
    });
  };
  
  async function handleParentSubmit(evt) { 
    evt.preventDefault(); 
    try { 
      const user = await updateParentProfile(userData);
      setFullUserProfile(user);      
      setSuccessMessage('Details successfully saved. '); // Updating the user that their details have been saved
    } catch { 
      setError('Update failed - please try again'); 
    } 
  };

  async function handleNannySubmit(evt) { 
    evt.preventDefault(); 
    try { 
      const user = await updateNannyProfile(userData);
      setFullUserProfile(user);
      console.log('this is the value of user post the server call', user)
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
      onSubmit={(userData.user.role === 'parent') ? handleParentSubmit : handleNannySubmit }
    >
      <Card>
        <CardHeader
          title="Profile"
        />
        <CardHeader
          subheader="Personal Details"
          style={{ textAlign: 'left' }}
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
              { (userData.user.role === 'parent')
              ? 
                < AccountProfileParentEl 
                  userData={userData} 
                  handleCheckedChange={handleCheckedChange} 
                  handleChange={handleChange}
                />
              : 
                <>
                < AccountProfileNannyEl 
                  userData={userData} 
                  handleCheckedChange={handleCheckedChange} 
                  handleChange={handleChange}
                />
                < AccountAvailability 
                  userData={userData} 
                  handleCheckedChange={handleCheckedChange} 
                  handleChange={handleChange}
                />
                </>
              }
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
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
    </>
)};

export default AccountProfileDetails

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