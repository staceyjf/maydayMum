import { useState } from 'react';
import AccountProfileNannyEl from '../AccountFormCustom/AccountProfileNannyEl';
import AccountProfileParentEl from '../AccountFormCustom/AccountProfileParentEl';
import { updateToken } from '../../../utilities/users-service';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, 
  Typography, Unstable_Grid2 as Grid } from '@mui/material';

function AccountProfileDetails({user, setUser}) {
  const [userData, setUserData] = useState({...user});
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');

  console.log('this is user in account', user)

  function handleFieldChange(evt) { // handles field changes to nanny / parent 
    let updatedUser; 

    if (userData.role === 'parent') {
      updatedUser = {
        ...userData.parent,
        [evt.target.name]: evt.target.value
      };
    } else if (userData.role === 'nanny') { 
      updatedUser = {
        ...userData.nanny,
        [evt.target.name]: evt.target.value
      };
    } 
  
    setUserData({
      ...userData,
      [userData.role]: updatedUser,
      error: ''
    });
  };
  
  function handleChange(evt) { 
    setUserData({ 
        ...userData, 
        [evt.target.name]: evt.target.value,
        error:'' 
    })  
  };

  function handleCheckedChange(evt) { // handles nanny user checkboxes (will need a seperate one for avaibility)
      // console.log('this is target.name', evt.target.name)
      // console.log('this is target checked', evt.target.checked)
      setUserData({
      ...userData,
      [evt.target.name]: evt.target.checked,
      error: '',
    });
  };

  async function handleSubmit(evt) { 
    evt.preventDefault(); 
    try { 
      const userUpdate = await updateToken(userData);
      setUser(userUpdate); 
      setSuccessMessage('Details successfully saved. '); // Updating the user that their details have been saved
       // Clear the success message after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); 
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
                  onChange={handleChange}
                  required
                  value={userData.firstName}
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
                  onChange={handleChange}
                  required
                  value={userData.surname}
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
                  onChange={handleChange}
                  required
                  value={userData.email}
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
                  onChange={handleChange}
                  value={userData.phoneNumber}
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
                  onChange={handleChange}
                  required
                  value={userData.location}
                />
              </Grid>
              { (userData.role === 'parent')
              ? 
                < AccountProfileParentEl 
                  userData={userData} 
                  handleCheckedChange={handleCheckedChange} 
                  handleFieldChange={handleFieldChange}
                />
              : 
                <>
                < AccountProfileNannyEl 
                  userData={userData} 
                  handleCheckedChange={handleCheckedChange} 
                  handleFieldChange={handleFieldChange}
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