import { useState } from 'react';
import { 
  Checkbox, 
  CardHeader, 
  FormControlLabel, 
  InputAdornment, 
  TextField, 
  Unstable_Grid2 as Grid 
} from '@mui/material';

function AccountProfileNannyEl({userData, onRoleChange}) {
  
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
          onChange={onRoleChange}
          required
          value={userData.nanny.aboutDescription}
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
          onChange={onRoleChange}
          required
          value={userData.nanny.nightRate}
        />
      </Grid>
      <Grid xs={12} md={6}>
      <FormControlLabel
        control={
          <Checkbox
            name="isFirstAidCertified"
            checked={userData.nanny.isFirstAidCertified} // set the value of checked
            onChange={onRoleChange} // runs specific change function
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
            checked={userData.nanny.isWccCleared} // set the value of checked
            onChange={onRoleChange} // runs specific change function
          />
        }
        label="WWC Cleared"
      />
      </Grid>     
    </>
)};

export default AccountProfileNannyEl
