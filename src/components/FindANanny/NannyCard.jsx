import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import {  
  Avatar, 
  Box, 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  Chip,  
  Divider, 
  Stack, 
  Typography 
} from '@mui/material';
import { addNannyToBooking } from '../../utilities/team-api';
import { filterNannyAvailability } from '../../utilities/booking-utils';

function NannyCard({ nanny, user, setBooking }) {
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const nannyAvaibilityFiltered = filterNannyAvailability(nanny)

  async function handleAddToBooking(evt, nanny) { 
    if (!user) {
      navigate('/users/log-in');
    } else {
      evt.preventDefault();  
      try { 
        console.log('this is user', user, 'this is nanny', nanny);
        const addBooking = await addNannyToBooking(nanny); // passing the desired nanny
        setBooking(addBooking);
        navigate('/team/booking');
      } catch { 
        setError('Update failed - please try again'); 
      }
    }
  }

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
            {nannyAvaibilityFiltered.map((day) => ( // iterate
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
        <Button
          type="submit"
          variant="contained"
          onClick={(evt) => handleAddToBooking(evt, nanny)} // Pass nanny as an argument
        >
          BOOK ME
        </Button>
      </CardActions>
    </Card>
  );
}

export default NannyCard;
