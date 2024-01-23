import { useState } from 'react';
import {  Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { updateToken } from '../../../utilities/users-service';

function AccountProfile({user, setUser, }) {
  const cloudName = process.env.REACT_APP_CLOUD_NAME || "default_cloud_name";

  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({...user});
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');

  // handle the 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const uploadImage = async () => {
    if (!image) return;
  
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "maydaymum"); 
    data.append("cloud_name", cloudName);
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'post',
        body: data,
      });
  
      if (response.ok) {
        const cloudinaryData = await response.json();
        const imageUrl = cloudinaryData.secure_url;
  
        const updatedUserData = { ...userData, image: imageUrl };
        const userUpdate = await updateToken(updatedUserData);
        setUser(userUpdate);
        setUserData(updatedUserData);
        setSuccessMessage('Details successfully saved.');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        console.error('Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };  


return (
  <>
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={userData.image}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
              color: '#fff',
            }}
          />
          <Typography gutterBottom variant="h5">
            {userData.fullName}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {userData.location}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button fullWidth variant="text" component="span">
            Upload picture
          </Button>
        </label>
        {image && (
          <Button fullWidth variant="text" onClick={uploadImage}>
            Save Image
          </Button>
        )}
      </CardActions>
    </Card>
  </>
);
}

export default AccountProfile;