// import the named export - look at Pure Component as an alternative
import { useState } from 'react'; 
import { signUp } from '../../utilities/users-service'
// MUI
import {  Avatar, Box, Button, FormControlLabel, Grid, Link, Paper, Radio, RadioGroup, Stack, TextField, Typography} from '@mui/material';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import signupImg from './signupImg.jpg'

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
          Mayday Mum
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

function SignUpForm({handleToggle, setUser, setIsExistingUser}) {
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
    try { 
      const user = await signUp(userData)
      setUser(user);
    } catch { 
      setError('Sign up failed - Try Again'); 
    } 
  };

  const disable = userData.password !== userData.confirm;
  
  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${signupImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Please sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Stack spacing={2} direction="row" sx={{marginBottom: 0}}>
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
              </Stack>
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography align='left' color="text.secondary">Looking to sign up as a:</Typography>
                  <RadioGroup
                    row
                    autoFocus
                    required
                    defaultValue="parent"
                    name="role"
                    value={userData.role} // Bind the value to state
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="parent"
                      control={<Radio />}
                      label="Parent"
                    />
                    <FormControlLabel
                      value="nanny"
                      control={<Radio />}
                      label="Nanny"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role - nanny or parent"
                name="role"
                autoFocus
                value={userData.role} 
                onChange={handleChange}
              /> */}
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
                disabled={disable}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }
              }
              >
                Sign Up
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link onClick={handleToggle} variant="body2" style={{ cursor: 'pointer' }}>
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
              <p className="error-message">&nbsp;{error}</p>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
  }

export default SignUpForm