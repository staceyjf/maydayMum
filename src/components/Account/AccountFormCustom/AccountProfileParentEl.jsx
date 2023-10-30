import { CardHeader, TextField, Unstable_Grid2 as Grid } from '@mui/material';

function AccountProfileParentEl({userData, onRoleChange}) {
  // console.log(userData)

  return (
    <>
       <CardHeader
          subheader="Children Details"
        />
      <Grid
        xs={12}
        md={12}
      >
        <TextField
          fullWidth
          label="Number of Children"
          name="numberOfChildren"
          onChange={onRoleChange}
          required
          value={userData.parent.numberOfChildren}
        />
      </Grid>
    </>
)};

export default AccountProfileParentEl
