import { useState } from 'react';
import { updateToken } from '../../utilities/users-service';
import AccountPersonalDetails from '../Account/AccountFormCustom/AccountPersonalDetails';
import BookedNannyDetails from '../Bookings/BookedNannyDetails';
import BookingDayForm from '../Bookings/BookingDayForm';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';


function BookingForm({ user, setUser, booking, setBooking }) {
  const [userData, setUserData] = useState({...user});
  const [bookingData, setBookingData] = useState({ ...booking });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(evt, data = 'userData') {
    console.log(evt.target.name)
    if (data === 'userData') {
      setUserData({
        ...userData,
        [evt.target.name]: evt.target.value,
        error: '',
      });
    } else if (data === 'bookingData') {
      setBookingData((prevBookingData) => { // trying out functional form of the state update function
        const updatedBookingData = {
          ...prevBookingData,
          [evt.target.name]: evt.target.checked,
          error: '',
        };
        return updatedBookingData;
      });
    }
  }
  
  function handleFieldChange(evt) { // handles field changes to nanny / parent 
    let updatedUser; 

    if (userData.role === 'parent') {
      updatedUser = {
        ...userData.parent,
        [evt.target.name]: evt.target.value
      };
    } else if (userData.role === 'nanny') { 
      updatedUser = {
        ...userData.nanny,
        [evt.target.name]: evt.target.value
      };
    } 
  
    setUserData({
      ...userData,
      [userData.role]: updatedUser,
      error: ''
    });
  };

  function handleCheckedChange(evt) { // handles nanny checkboxes 
    const updatedUser = {
      ...userData.nanny,
      [evt.target.name]: evt.target.checked
    };
    
    setUserData({
      ...userData,
      nanny: updatedUser,
      error: ''
    });
  };
  

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
    <>
    {/* the parent */}
      <AccountPersonalDetails
        userData={userData}
        onChange={handleChange}
        onFieldChange={handleFieldChange}
        onCheckedChange={handleCheckedChange}
        onSubmit={handleSubmit}
        successMessage={successMessage}
        error={error} 
      />
    {/* the booked nanny */}
      <BookedNannyDetails
        userData={booking.nanny}
      />
    {/* the booked nanny */}
      <BookingDayForm
        bookingData={bookingData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default BookingForm;
