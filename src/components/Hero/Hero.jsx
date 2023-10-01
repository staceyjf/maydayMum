import { Box, Grid, Typography } from '@mui/material';
import styles from './Hero.module.css'; // bring in specific styling to hero

function Hero() {
  return (
    <Box className={styles.heroBox}>
      <Grid
        container
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(12, 1fr)',
          height: '100vh',
        }}
      >
        <Grid
          item
          sx={{
            backgroundColor: 'secondary.main',
            padding: '30px',
            display: { xs: 'none', md: 'grid' },
            gridRow: '3 / span 4',
            gridColumn: '8 / span 5',
          }}
        >
          <Typography variant="h6" sx={{
            textTransform: 'uppercase',
            color: 'white',
            textAlign: 'start',
          }}>
            Trusted childcare
          </Typography>
          <Typography variant="h4" sx={{
            textTransform: 'uppercase',
            textAlign: 'start',
            fontSize: '2vmax',
            color: 'black',
            fontWeight: 'bold',
            paddingTop: '5px',
          }}>
            Connect with top overnight nannies in the Northern Beaches.
          </Typography>
          <Typography variant="body1" sx={{
            textAlign: 'justify',
            color: 'white',
            opacity: 0.5,
            paddingTop: '15px',
          }}>
            Welcome to Mayday Mum. <br />
            We understand that every parent needs a helping hand,
            especially during those long nights. <br />
            Our fixed nightly fee covers a full 12 hours of
            dedicated support, so you can rest easy knowing your little ones are in caring hands.
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor: 'secondary.main',
            padding: '30px',
            display: { xs: 'grid', md: 'none' },
            gridRow: '5',
            gridColumn: '2 / span 10',
          }}
        >
          <Typography variant="h6" sx={{
            textTransform: 'uppercase',
            color: 'white',
            textAlign: 'start',
          }}>
            Trusted childcare
          </Typography>
          <Typography variant="h4" sx={{
            textTransform: 'uppercase',
            textAlign: 'start',
            fontSize: '3vmax',
            color: 'black',
            fontWeight: 'bold',
            paddingTop: '5px',
          }}>
            Connect with top overnight nannies in the Northern Beaches.
          </Typography>
          <Typography variant="body1" sx={{
            textAlign: 'justify',
            color: 'white',
            opacity: 0.5,
            paddingTop: '15px',
          }}>
            Welcome to Mayday Mum. <br />
            We understand that every parent needs a helping hand,
            especially during those long nights. <br />
            Our fixed nightly fee covers a full 12 hours of
            dedicated support, so you can rest easy knowing your little ones are in caring hands.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Hero;
