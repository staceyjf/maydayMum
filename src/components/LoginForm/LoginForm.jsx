import { useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import * as usersService from '../../utilities/users-service'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import loginImg from './loginImg.jpg'

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <b>Don't fancy signing up - explore a Parent profile with: </b><br />
      <b>User address:</b> alice@gmail.com <br />
      <b>Password: </b>1234 <br /><br />
      {'\nCopyright © Mayday Mum '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function LoginForm({handleToggle, setUser}) {
  const [credentials, setCredentials] = useState({ 
      email: '', 
      password: '' 
  }); 
  const navigate = useNavigate();
  const [error, setError] = useState(''); 

  function handleChange(evt) { 
      setCredentials({ 
          ...credentials, [evt.target.name]: evt.target.value 
      }); 
      setError(''); }

  async function handleSubmit(evt) { 
      evt.preventDefault(); 
      try { 
          const user = await usersService.login(credentials); 
          setUser(user); 
          navigate('/');
      } catch { 
          setError('Log In Failed - Try Again'); 
      } 
  } 
  
  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item 
          xs={12} sm={8} 
          md={5} 
          component={Paper} 
          elevation={6} 
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
           <Avatar sx={{ m: 1, bgcolor: 'secondary.main', color: 'white' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Please login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={credentials.email} 
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
                value={credentials.password} onChange={handleChange}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                LOGIN
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
          </Grid> */}
                <Grid item>
                  <Link onClick={handleToggle} variant="body2" style={{ cursor: 'pointer' }}>
                    {"Don't have an account? Sign Up"}
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

export default LoginForm;
