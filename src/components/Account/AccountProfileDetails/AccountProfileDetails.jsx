import { useState, useEffect } from 'react';
import { updateParentProfile } from '../../../utilities/users-api';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Unstable_Grid2 as Grid } from '@mui/material';
// import aboutUsImg from './aboutUsImg.jpg'
// import styles from './Hero.module.css'; // bring in specific styling to hero


function AccountProfileDetails({fullUserProfile, setFullUserProfile}) {
  console.log('this is the fullUserprofile', fullUserProfile);

  const [userData, setUserData] = useState({
    firstName: '',
    surname: '',
    location: '',
    phoneNumber: '',
    email: '',
    parent: {
      numberOfChildren: 1,
      childrenAge: [ 1 ],
      bookings: []
    },
    error: '',
  });
  const [error, setError] = useState(''); 

  const childrenCount = [1,2,3,4,5];

    // Update userData when fullUserProfile changes
    useEffect(function() {
      function updateFormData() {
        if (fullUserProfile) {
          setUserData(fullUserProfile); // Set userData to the received fullUserProfile
        }
      }
      
      updateFormData();
    }, [fullUserProfile]);

  function handleChange(evt) { 
    setUserData({ 
        ...userData, 
        [evt.target.name]: evt.target.value,
        error:'' 
    });
  };

  async function handleSubmit(evt) { 
    evt.preventDefault(); 
    try { 
      const user = await updateParentProfile(userData);
      setFullUserProfile(user); 
    } catch { 
      setError('Update failed - please try again'); 
    } 
  };

  return (
    <>
    {/* <h1>{fullUserProfile.parent.numberOfChildren}</h1> */}
    <h1>{fullUserProfile.role}</h1>
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Update where needed"
          title="Profile"
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
                  helperText="Please specify the first name"
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
                md={6}
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
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select no of Children"
                  name="parent.numberOfChildren"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={userData.parent.numberOfChildren} 
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
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
    </>
)};

export default AccountProfileDetails