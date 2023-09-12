import { CardHeader, TextField, Unstable_Grid2 as Grid } from '@mui/material';

function AccountProfileParentEl({userData, handleChange}) {
  // console.log(userData)

  return (
    <>
       <CardHeader
          subheader="Parent Details"
        />
      <Grid
        xs={12}
        md={12}
      >
        <TextField
          fullWidth
          label="Number of Children"
          name="numberOfChildren"
          onChange={handleChange}
          required
          value={userData.numberOfChildren}
        />
      </Grid>
    </>
)};

export default AccountProfileParentEl
