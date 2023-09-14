import React from 'react';
import Box from '@mui/material/Box';
import logo from './logo.png';

function LogoSmall() {
  return (
      <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
        <img
          src={logo}
          alt="Mayday Mum Logo"
          style={{
            maxWidth: '50px', 
            maxHeight: '50px', 
          }}
        />
      </Box>
  );
}

export default LogoSmall;
