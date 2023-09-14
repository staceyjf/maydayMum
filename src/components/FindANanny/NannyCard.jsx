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
                height: 100,
                mb: 2,
                width: 100,
                color: 'white',
              }}
            />
          }
          title={<Typography variant="h5">{nanny.fullName}</Typography>}
          subheader={nanny.nanny.aboutDescription}
        />
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography color="text.secondary" variant="body2">
              ${nanny.nanny.nightRate} per night
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label='First Aid Certified'
                color="primary"
                style={{
                  display: nanny.nanny.isFirstAidCertified ? 'inherit' : 'none',
                }}
              />
              <Chip
                label='WWW Clearance'
                color="primary"
                style={{
                  display: nanny.nanny.isWccCleared ? 'inherit' : 'none',
                }}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              {Object.entries(nanny.weeklyAvailability)
                .sort() // Sort in alphabetical order
                .filter(([day, available]) => available) // Filter by available days
                .map(([day, available]) => (
                  <Chip
                    label={day}
                    color="secondary"
                    key={day} // Added key to each Chip
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