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
          sx={{
            padding: 0
          }}
          title={<Typography variant="h5">{nanny.fullName}</Typography>}
          subheader={
            <>
              <Typography variant="body2" paragraph>
                {nanny.nanny.aboutDescription}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                ${`${nanny.nanny.nightRate} per night`}
              </Typography>
            </>
          }
        />
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack 
              direction="row" 
              spacing={1}
              padding={1}
              >
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
              {Object.entries(nanny.weeklyAvailability) // convert my availability doc (object) to an array
                .filter(([day, available]) => available && day.includes('day')) // Filter by available days that contain 'day'
                .map(([day, available]) => ( // iterate
                  <Chip
                    label={day}
                    color="secondary"
                    key={day}
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