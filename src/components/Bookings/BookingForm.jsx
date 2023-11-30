import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateToken } from '../../utilities/users-service';
import { updateBooking } from '../../utilities/team-api';
import AccountPersonalDetails from '../Account/AccountFormCustom/AccountPersonalDetails';
import BookedNannyDetails from '../Bookings/BookedNannyDetails';
import BookingDayForm from '../Bookings/BookingDayForm';
import { set } from 'mongoose';

function BookingForm({ user, setUser, booking, setBooking }) {
  const [userData, setUserData] = useState({ ...user });
  const [bookingData, setBookingData] = useState({ ...booking });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  function handleChange(evt, data = 'userData') {
    if (data === 'userData') {
      setUserData({
        ...userData,
        [evt.target.name]: evt.target.value,
        error: '',
      });
    } else if (data === 'bookingData') {
      setBookingData((prevBookingData) => {
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
        const hasChanges = Object.keys(userData).some(
          (key) => userData[key] !== user[key]
        );

        if (hasChanges) {
          const updateUser = await updateToken(userData);
          setUser(updateUser);
          setSuccessMessage('User details updated');
        } 
        
      const updatedBooking = await updateBooking(bookingData);
      setBooking(updatedBooking);
      // const userUpdate = await updateToken(updatedBooking.user);
      // console.log('this is the user post updating the token', userUpdate);
      setUser(updatedBooking);
      setSuccessMessage('Booking successful');
      navigate('/accounts/account-profile')

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
        setError('Booking failed - please try again');

          // Clear error message after 3 seconds
    setTimeout(() => {
      setError('');
    }, 3000);
    }
  }

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
      <BookedNannyDetails userData={booking.nanny} />
      {/* the booking days */}
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
