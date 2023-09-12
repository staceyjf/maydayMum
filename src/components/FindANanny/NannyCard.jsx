import {  Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';

function NannyCard({nanny}) {
  console.log('these are all our nannies', nanny);

  return (
    <>
    <Card>
      <CardHeader
    //   avatar={
    //   <Avatar
    //         src={fullUserProfile.image}
    //         sx={{
    //           height: 80,
    //           mb: 2,
    //           width: 80
    //         }}
    //       />
    //     }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016" 
          >
      </CardHeader>    
      <Divider />
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
          >
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          > {}
          </Typography>
        </Box>
      </CardContent>
    {/* <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
  </>
)};

export default NannyCard