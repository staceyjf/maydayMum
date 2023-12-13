import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateToken } from '../../utilities/users-service';
import { updateBooking } from '../../utilities/team-api';
import BookedNannyDetails from '../Bookings/BookedNannyDetails';
import BookingDayForm from '../Bookings/BookingDayForm';

function BookingForm({ user, setUser, booking, setBooking }) {
  const [bookingData, setBookingData] = useState({ ...booking });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    setBookingData((prevBookingData) => {
      const updatedBookingData = {
        ...prevBookingData,
        [evt.target.name]: evt.target.checked,
        error: '',
      };
      return updatedBookingData;
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const updatedBooking = await updateBooking(bookingData);
      setBooking(updatedBooking);
      console.log('this is updatedBooking', updatedBooking);
    
      const userUpdate = await updateToken(updatedBooking.user);
      console.log('this is what is setting user in bookingform', userUpdate);
      setUser(userUpdate);
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
