import {  Box, Grid, Typography } from '@mui/material';
import styles from './Hero.module.css'; // bring in specific styling to hero

function Hero() {

    return (
        <Box className={styles.heroBox}> 
        <Grid container spacing={6} className={styles.gridContainer}>
          <Grid item xs={12} md={7} className={styles.gridBox}>
            <Typography variant="h6" className={styles.subtitle}>
              Trusted childcare
            </Typography>
            <Typography variant="h3" fontWeight={500} className={styles.title}>
              Connect with top overnight nannies in the Northern Beaches.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

export default Hero