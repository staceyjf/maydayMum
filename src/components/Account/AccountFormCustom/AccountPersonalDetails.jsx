import AccountProfileNannyEl from '../AccountFormCustom/AccountProfileNannyEl';
import AccountProfileParentEl from '../AccountFormCustom/AccountProfileParentEl';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, 
  Typography, Unstable_Grid2 as Grid } from '@mui/material';

function AccountPersonalDetails({ userData, onChange, onRoleChange, onSubmit, showButton, successMessage, error }) {
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={onSubmit}
    >
      <Card>
        <CardHeader
          subheader="Personal Details"
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
                  label="First name"
                  name="firstName"
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
                  value={userData.phoneNumber}
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
                  onChange={onChange}
                  required
                  value={userData.location}
                />
              </Grid>
              { (userData.role === 'parent')
              ? 
                < AccountProfileParentEl 
                  userData={userData} 
                  onRoleChange={onRoleChange}
                />
              : 
                <>
                < AccountProfileNannyEl 
                  userData={userData} 
                  handleCheckedChange={onRoleChange} 
                  handleFieldChange={onRoleChange}
                />
                </>
              }
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Typography variant="h6">
          {successMessage}
          {error}
          </Typography>
          {showButton && (
            <Button type="submit" variant="contained">
              Save details
            </Button>
          )}
        </CardActions>
      </Card>
    </form>
)};

export default AccountPersonalDetails