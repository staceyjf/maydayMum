import { Checkbox, FormControl, FormControlLabel, FormLabel, FormGroup, FormHelperText, Unstable_Grid2 as Grid } from '@mui/material';

function AccountAvailability({userData, handleCheckedChange, handleChange}) {
  console.log(userData)

  const availability = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return (
    <>
      <Grid container
        xs={12} md={12} 
        justifyContent="flex-start"
      >
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend" style={{ textAlign: 'left' }}>
              Weekly Availability
              </FormLabel>
            <FormHelperText>Select your weekly avaibility</FormHelperText>
            <FormGroup>
            { availability.map((day, idx) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name="availability"
                    checked={userData.availability} // set the value of checked
                    onChange={handleCheckedChange} // runs specific change function
                  />
                }
              label={day}
              />
            ))}
            </FormGroup>
        </FormControl>
      </Grid>
    </>
)};

export default AccountAvailability
