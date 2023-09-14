import NannyCard from './NannyCard';
import { Box } from '@mui/material';
// import { Link } from "react-router-dom";

function NannyList({ nannies, }) {
  console.log('this is all nannies', nannies);

  return (
    <>
  {    nannies.map((n, idx) => (
        <Box 
          key={idx}
          sx={{
            marginTop: 2.5
          }}
        > 
          <NannyCard
            nanny={n}
          />
        </Box>
        ))}
    </>
  );
}

export default NannyList;