import { useState } from 'react'; 
// MUI 
import {  Avatar, Box, Button, CssBaseline, Grid, Link, Paper, Stack, TextField, Typography} from '@mui/material';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function NewNannyForm({handleToggle, setUser}) {
  const [userData, setUserData] = useState({
    firstName: '',
    surname: '',
    email: '',
    role: '',
    password: '',
    confirm: '',
    error: '',
  });
  const [error, setError] = useState(''); 

  function handleChange(evt) { 
    setUserData({ 
        ...userData, 
        [evt.target.name]: evt.target.value,
        error:'' 
    }); 
  };

  async function handleSubmit(evt) { 
    evt.preventDefault(); 
    // try { 
    //   const user = await signUp(userData)
    //   setUser(user); 
    // } catch { 
    //   setError('Sign up failed - Try Again'); 
    // } 
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              New Nanny Profile
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={userData.firstName} 
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="surname"
                label="Surname"
                name="surname"
                autoComplete="family-name"
                autoFocus
                value={userData.surname} 
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={userData.email} 
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role - nanny or parent"
                name="role"
                autoFocus
                value={userData.role} 
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userData.password} 
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm"
                label="Confirm Password"
                type="password"
                id="confirm"
                autoComplete="new-password"
                value={userData.confirm} 
                onChange={handleChange}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }
              }
              >
                Submit
              </Button>
              <p className="error-message">&nbsp;{error}</p>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
  }

export default NewNannyForm