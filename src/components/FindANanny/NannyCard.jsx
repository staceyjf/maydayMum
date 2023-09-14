import {  Avatar, Box, Button, Card, CardActions, 
  CardContent, CardHeader, Chip,  Divider, Stack, Typography } from '@mui/material';

  function NannyCard({ nanny }) {
    console.log('this is a single nanny', nanny);
  
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar
              src={nanny.image}
              sx={{
                height: 80,
                mb: 2,
                width: 80,
                color: 'white', // Corrected 'color' to 'backgroundColor'
              }}
            />
          }
          title={<Typography variant="h5">{nanny.fullName}</Typography>}
          subheader={nanny.nanny.aboutDescription}
        ></CardHeader>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography 
              color="text.secondary" 
              variant="body2"
            >
              ${nanny.nanny.nightRate} per night
            </Typography>
            <Stack direction="row" spacing={1}>
              {Object.entries(nanny.weeklyAvailability)
              .sort() // sort to alphabetic order
              .filter(([day, available]) => available) // Filter by available days
              .map(([day, available]) => ( 
                  <Chip
                    label={day}
                    color="secondary" 
                  />
              ))}
            </Stack>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            BOOK ME
          </Button>
        </CardActions>
      </Card>
    );
  }
  
  export default NannyCard;
  