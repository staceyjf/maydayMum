import { useState } from 'react';
import AccountPersonalDetails from '../AccountFormCustom/AccountPersonalDetails';
import { updateToken } from '../../../utilities/users-service';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, 
  Typography, Unstable_Grid2 as Grid } from '@mui/material';

function AccountProfileDetails({user, setUser, showButton}) {
  const [userData, setUserData] = useState({...user});
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');

  // console.log('this is user in account', user)
  
  function handleChange(evt) { 
    setUserData({ 
        ...userData, 
        [evt.target.name]: evt.target.value,
        error:'' 
    })  
  };

  function handleRoleDataChange(evt) {
    const target = evt.target;
    let updatedUser;
  
    if (userData.role === 'nanny') {
      updatedUser = {
        ...userData,
        nanny: {
          ...userData.nanny,
          [target.name]: target.type === 'checkbox' ? target.checked : target.value,
        },
        error: '',
      };
    } else if (userData.role === 'parent') {
      updatedUser = {
        ...userData,
        parent: {
          ...userData.parent,
          [target.name]: target.type === 'checkbox' ? target.checked : target.value,
        },
        error: '',
      };
    }
  
    setUserData(updatedUser);
  }

  async function handleSubmit(evt) { 
    evt.preventDefault(); 
    try { 
      const userUpdate = await updateToken(userData);
      console.log(userUpdate);
      setUser(userUpdate); 
      setSuccessMessage('Details successfully saved. '); // Updating the user that their details have been saved
      setTimeout(() => {   // Clear the success message
        setSuccessMessage('');
      }, 3000); 
    } catch { 
      setError('Update failed - please try again'); 
    } 
  };

  return (
    <AccountPersonalDetails
      userData={userData}
      onChange={handleChange}
      onRoleChange={handleRoleDataChange}
      onSubmit={handleSubmit}
      successMessage={successMessage}
      error={error}
      showButton={showButton} 
    />
)};

export default AccountProfileDetails