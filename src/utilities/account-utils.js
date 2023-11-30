// account image upload
function uploadImage(image) {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "react-uploads")
    data.append("cloud_name", "maydaymum")
    return fetch(" https://api.cloudinary.com/v1_1/maydaymum/image/upload ",{
        method:"post",
        body: data
    })
    .then(res => res.json())
    .catch(err => console.log(err))
  }

// Function to get booked days from a booking object
export function getBookedDays(booking) {
    return Object.entries(booking)
      .filter(([day, isBooked]) => isBooked && day !== 'id' && day !== '_id')
      .map(([day]) => day);
  }