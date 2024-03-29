import NannyCard from './NannyCard';
import { Box } from '@mui/material';

function NannyList({ nannies, user, setBooking}) {

  return (
    <>
  {    nannies.map((n, idx) => (
        <Box 
        // TODO: change key to something else perhaps .id of the doc
          key={idx + 1} 
          sx={{
            marginBottom: 2.5
          }}
        > 
          <NannyCard
            nanny={n}
            user={user}
            setBooking={setBooking}
          />
        </Box>
        ))}
    </>
  );
}

export default NannyList;