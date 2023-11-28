import { useState } from 'react';
import { updateToken } from '../../utilities/users-service';
import AccountPersonalDetails from '../Account/AccountFormCustom/AccountPersonalDetails';
import BookedNannyDetails from '../Bookings/BookedNannyDetails';
import BookingDayForm from '../Bookings/BookingDayForm';

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
      setBookingData((prevBookingData) => { // new state depends on the old state
        const updatedBookingData = {
          ...prevBookingData,
          [evt.target.name]: evt.target.checked,
          error: '',
        };
        return updatedBookingData;
      });
    }
  }
  
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
    <>
    {/* the parent */}
      <AccountPersonalDetails
        userData={userData}
        onChange={handleChange}
        onRoleChange={handleRoleDataChange}
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
        successMessage={successMessage}
        error={error} 
      />
    </>
  );
}

export default BookingForm;
