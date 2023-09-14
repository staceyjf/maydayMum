import {  Avatar, Box, Button, Card, CardActions, 
  CardContent, CardHeader, Divider, Typography } from '@mui/material';

function NannyCard({nanny}) {
  console.log('this is a single nanny', nanny);

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
            {nanny.fullName}
          </Typography>
        }
        subheader={nanny.nanny.aboutDescription}
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
            color="text.secondary"
            variant="body2"
          > ${nanny.nanny.nightRate} per night
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