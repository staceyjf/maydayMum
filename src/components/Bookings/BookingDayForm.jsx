import { orderedAvailability } from '../../utilities/booking-utils';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

function BookingDayForm({ bookingData, onChange, onSubmit }) {

  const orderedDays = orderedAvailability(bookingData);
  console.log('this is orderedDays:', orderedDays)
  console.log('this is bookingData:', bookingData)

  return (
    <>
    <form autoComplete="off" noValidate onSubmit={onSubmit}>
      <Card>
      <CardHeader subheader={`Please select which night/s you would like to book ${bookingData.nanny.fullName} for:`} 
                  style={{ textAlign: 'left' }} 
        />
      <CardContent>
    <Box sx={{ m: -1.5, p: 0 }}>
    <Grid container spacing={3}>
      <Grid xs={12} md={12} sx={{ textAlign: 'left', padding: 0 }}>
      <FormControl sx={{ ml: 3 }} component="fieldset" variant="standard">
          <FormGroup>
          {orderedDays.filter(([key]) => bookingData.nanny.weeklyAvailability[key])
          .map(([day, isAvailable]) => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  name={day}
                  checked={isAvailable}
                  onChange={(evt) => onChange(evt, 'bookingData')}
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
  </ Card>
</form>
</>
);
}

export default BookingDayForm;
