import { Checkbox, CardHeader, FormControlLabel, InputAdornment, TextField, Unstable_Grid2 as Grid } from '@mui/material';

function AccountProfileNannyEl({userData, handleCheckedChange, handleChange}) {
  // console.log(userData)

  return (
    <>
       <CardHeader
          subheader="Nanny Details"
        />
      <Grid
        xs={12}
        md={12}
      >
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="About my experience"
          multiline
          rows={4}
          name="aboutDescription"
          onChange={handleChange}
          required
          value={userData.aboutDescription}
        />
      </Grid>
      <Grid
        xs={12}
        md={12}
      >
        <TextField
          fullWidth
          id="standard-adornment-amount"
          // startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Nightly Rate in $"
          name="nightRate"
          onChange={handleChange}
          required
          value={userData.nightRate}
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
    </>
)};

export default AccountProfileNannyEl
