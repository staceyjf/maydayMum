import {  Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

function AccountProfile({user}) {
  console.log('this is the account profile component user', user);

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
            src={user.image}
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
            {user.fullName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          > 
            {user.location} 
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