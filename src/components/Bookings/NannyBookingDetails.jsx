import { useState } from 'react';
import { updateToken } from '../../utilities/users-service';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, 
    Typography, Unstable_Grid2 as Grid } from '@mui/material';

function NannyBookingDetails({user, setUser, booking, setBooking }) {
    const [bookingData, setBookingData] = useState({...booking});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

  function handleChange(evt) { 
    setBookingData({ 
        ...bookingData, 
        [evt.target.name]: evt.target.value,
        error:'' 
    })  
  };

  async function handleSubmit(evt) { 
    evt.preventDefault(); 
    try { 
      const userUpdate = await updateToken(bookingData);
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
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <Card>
            <CardHeader
              subheader="Personal Details"
              style={{ textAlign: 'left' }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                <Grid
                  container spacing={3}
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
                      value={bookingData.user.firstName}
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
                      value={bookingData.user.surname}
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
                      value={bookingData.user.email}
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
                      value={bookingData.user.phoneNumber}
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
                      value={bookingData.user.location}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <Divider />
            <CardHeader
            subheader="Nanny Details"
            style={{ textAlign: 'left' }}
          />
          <CardContent>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid
                    xs={12}
                    md={12}
                  >
                    <TextField
                      fullWidth
                      label="Nanny"
                      name="fullName"
                      required
                      value={bookingData.nanny.fullName}
                    />
                  </Grid>
                <Grid
                    xs={12}
                    md={6}
                  >
                    <TextField
                      fullWidth
                      label=""
                      name="fullName"
                      required
                      value={bookingData.nanny.fullName}
                    />
                  </Grid>
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

);
  }
   
export default NannyBookingDetails