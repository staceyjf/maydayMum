import {  Avatar, Box, Button, Card, CardActions, 
  CardContent, CardHeader, Divider, Typography } from '@mui/material';

function NannyCard({nanny}) {
  // console.log('these are all our nannies', nanny);

  return (
    <>
    <Card>
      <CardHeader
      avatar={
      <Avatar
            src={nanny.image}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
        }
        title={
          <Typography
            variant="h5"
            sx={{ fontSize: '24px' }} // Customize the font size here
          >
            {nanny.user.fullName}
          </Typography>
        }
        subheader={nanny.aboutDescription}
          >
      </CardHeader>    
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
          > Add avaibility here 
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained">
          BOOK ME
        </Button>
      </CardActions>
  </Card>
  </>
)};

export default NannyCard