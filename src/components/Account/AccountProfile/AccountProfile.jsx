import {  Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

function AccountProfile({fullUserProfile, setFullUserProfile}) {
  console.log('this is the account profile component fulluserprofile', fullUserProfile);
  return (
    <>
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={fullUserProfile.image}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {fullUserProfile.user.fullName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          > 
            {fullUserProfile.location} 
          </Typography>
        </Box>
      </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
  </>
)};

export default AccountProfile