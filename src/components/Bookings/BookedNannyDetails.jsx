import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
} from '@mui/material';

function BookedNannyDetails({ userData }) {
  return (
    <Card>
      <CardHeader subheader="Booking details" style={{ textAlign: 'left' }} />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}> 
              <TextField
                fullWidth
                label="Nanny name"
                value={userData.fullName}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default BookedNannyDetails;
