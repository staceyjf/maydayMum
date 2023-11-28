import { Grid, Typography } from '@mui/material';
import aboutUsImg from './aboutUsImg.jpg'

function Hero() {
  return (
    <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden', }}>
      {/* Background image Grid */}
      <Grid item
        xs={12}
        sx={{
          backgroundImage: `url(${aboutUsImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative', // Set position to relative
       
        }}
      />
      {/* Text Grid */}
      <Grid container item 
          xs={4}
          sx={{
            position: 'absolute', 
            top: '30%', // Align the top edge to the middle
            right: 0, 
            backgroundColor: 'secondary.main',
            padding: '30px',
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
      </Grid>
  );
}

export default Hero;
