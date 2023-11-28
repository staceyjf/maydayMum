import { useState } from 'react';
import { updateToken } from '../../utilities/users-service';
import { updateBooking } from '../../utilities/team-api';
import AccountPersonalDetails from '../Account/AccountFormCustom/AccountPersonalDetails';
import BookedNannyDetails from '../Bookings/BookedNannyDetails';
import BookingDayForm from '../Bookings/BookingDayForm';

function BookingForm({ user, setUser, booking, setBooking }) {
  const [userData, setUserData] = useState({ ...user });
  const [bookingData, setBookingData] = useState({ ...booking });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
    console.log('this is userData', userData)
    console.log('this is bookingData', bookingData)
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
      setSuccessMessage('Booking successful');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
        setError('Booking failed - please try again');
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
