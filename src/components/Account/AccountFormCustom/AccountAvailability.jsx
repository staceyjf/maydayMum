import { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormLabel, FormGroup, FormHelperText, Unstable_Grid2 as Grid } from '@mui/material';

function AccountAvailability({userData, setUserData}) {
  const [weeklyAvailabilityData, setWeeklyAvailabilityData] = useState([
    { day: 'Monday', isAvailable: true },
    { day: 'Tuesday', isAvailable: true },
    { day: 'Wednesday', isAvailable: true },
    { day: 'Thursday', isAvailable: true },
    { day: 'Friday', isAvailable: true },
    { day: 'Saturday', isAvailable: true },
    { day: 'Sunday', isAvailable: true },
  ]);

  function handleAvailabilityChange(evt) { 
    // handles nanny user checkboxes (will need a seperate one for avaibility)
      console.log('this is target.name', evt.target.name)
      console.log('this is target checked', evt.target.checked)
      
      setWeeklyAvailabilityData({
        ...weeklyAvailabilityData,
        [evt.target.name]: evt.target.checked,
    })
    ;
    setUserData({
      ...userData,
      weeklyAvailability: weeklyAvailabilityData
    });
  };

  return (
    <>
      <Grid
        xs={12} md={12}
        sx={{ textAlign: 'left',  padding: 0  }} 
      >
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend" style={{ textAlign: 'left' }}>
              Weekly Availability
              </FormLabel>
            <FormHelperText>Select your weekly availability</FormHelperText>
            <FormGroup>
            { userData.weeklyAvailability.map((d, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    name={d.day}
                    checked={d.isAvailable} // set the value of checked
                    onChange={handleAvailabilityChange} // runs specific change function
                  />
                }
              label={d.day}
              />
            ))}
            </FormGroup>
        </FormControl>
      </Grid>
    </>
)};

export default AccountAvailability