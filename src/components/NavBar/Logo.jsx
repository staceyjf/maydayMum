import React from 'react';
import Box from '@mui/material/Box';
import logo from './logo.png';

function Logo() {
  return (
      <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
        <img
          src={logo}
          alt="Mayday Mum Logo"
          style={{
            maxWidth: '75px', 
            maxHeight: '75px', 
          }}
        />
      </Box>
  );
}

export default Logo;
