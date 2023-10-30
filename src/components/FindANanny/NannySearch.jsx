import { useState } from 'react';
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
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { orderedAvailability } from '../../utilities/booking-utils';

function NannySearch({nannies, setNanniesForSearchFilter, booking}) {
  const [bookingData, setBookingData] = useState({ ...booking });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const orderedDays = orderedAvailability(bookingData);

  function handleCheckedChange(evt) {
    // handles availability checkboxes
    setBookingData({
      ...bookingData,
      [evt.target.name]: evt.target.checked,
      error: '',
    });
  }

    async function handleSubmit(evt) {
      evt.preventDefault();
      try {
        // Filter nanny data based on the bookingData object
        const selectedDays = Object.keys(bookingData).filter((key) => key.includes('day'));
        const filteredNannies = nannies.filter((nanny) => {
          // Check if nanny is available on at least one selected day eg true in bookingData & nanny info
          return selectedDays.some((day) => bookingData[day] && nanny.weeklyAvailability[day]);
        });
    
        // Do something with the filtered nannies
        console.log('this is filteredNannies', filteredNannies);
        setNanniesForSearchFilter(filteredNannies);
      } catch {
        setError('Update failed - please try again');
      }
    }

    return (
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardHeader subheader={`Search for nannies based on:`} style={{ textAlign: 'left' }} />
            <CardContent>
              <Box sx={{ m: -1.5, p: 0 }}>
                <Grid container spacing={3}>
                  <Grid xs={12} md={12} sx={{ textAlign: 'left', padding: 0 }}>
                  <FormControl sx={{ ml: 3 }} component="fieldset" variant="standard">
                      <FormGroup>
                      {orderedDays.map(([day, isAvailable]) => (
                        <FormControlLabel
                          key={day}
                          control={
                            <Checkbox
                              name={day}
                              checked={isAvailable}
                              onChange={handleCheckedChange}
                            />
                          }
                          label={day}
                        />
                      ))}
                      </FormGroup>
                    </FormControl>
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
                SEARCH
              </Button>
            </CardActions>
          </Card>
        </form>
      </>
    );
  }

export default NannySearch