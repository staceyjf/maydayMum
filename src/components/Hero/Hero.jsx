import {  Box, Grid, Typography } from '@mui/material';
import styles from './Hero.module.css'; // bring in specific styling to hero

function Hero() {

    return (
        <Box className={styles.heroBox}> 
        <Grid container className={styles.gridContainer}>
          <Grid item className={styles.gridItem}>
            <Typography className={styles.subtitle}>
              Trusted childcare
            </Typography>
            <Typography className={styles.title}>
              Connect with top overnight nannies in the Northern Beaches.
            </Typography>
            <Typography className={styles.p}>
              Welcome to Mayday Mum – your trusted Northern Beaches destination for overnight 
              nannying services. We understand that every parent needs a helping hand, 
              especially during those long nights. Our fixed nightly fee covers a full 12 hours of 
              dedicated support, so you can rest easy knowing your little ones are in caring hands. 
              Join our Mayday Mum family today, and let us make your nights more peaceful and 
              your mornings brighter.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

export default Hero