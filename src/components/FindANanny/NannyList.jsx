import NannyCard from './NannyCard';
import { Box } from '@mui/material';

// import { Link } from "react-router-dom";

function NannyList({ fullUserProfile, isLoadingAllData, nannies }) {
  
  return (
    <>
      {isLoadingAllData ? (
        <div>Loading...</div>
      ) : (
        nannies.map((n, idx) => (
          <Box 
            key={idx}
            m={2.5}
          > 
            <NannyCard
              nanny={n}
            />
          </Box>
          ))
      )}
    </>
  );
}

export default NannyList;