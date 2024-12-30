import { Card, CardContent, CardMedia, Typography, Box, Rating, Stack, Button, Chip } from '@mui/material';
import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';
import OnlineIcon from '@mui/icons-material/FiberManualRecord';

const TutorCard = ({ tutor }) => {
  // Calculate the average rating
  const avgRating = tutor.rating.reduce((a, b) => a + b, 0) / tutor.rating.length;

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
        <div className='flex justify-center items-center mt-4'>
      <CardMedia
        component='img'
        style={{
            height : 150,
            width : 150,
            borderRadius : 100,
        }}
        image={tutor.image ? tutor.image : 'https://www.merchantmaverick.com/wp-content/uploads/2020/04/Online_tutor_teacher_using_laptop_at_their_desk.jpg'}
        alt={tutor.name}
      />
      </div>

      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom alignSelf='center'>
          {tutor.name}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            {tutor.qualification} in {tutor.subject}
          </Typography>
          <Chip
            label={tutor.status}
            size="small"
            color={tutor.status === 'ONLINE' ? 'success' : 'default'}
            icon={<OnlineIcon />}
          />
        </Stack>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Experience: {tutor.experience}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {tutor.greet}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <PhoneIcon fontSize="small" color="primary" />
          <Typography variant="body2" color="text.secondary">
            {tutor.mobile}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <LanguageIcon fontSize="small" color="primary" />
          <Typography variant="body2" color="text.secondary">
            Languages: {tutor.primaryLanguage}, {tutor.secondryLanguage}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <StarIcon fontSize="small" sx={{ color: '#ffb400' }} />
          <Rating value={avgRating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({tutor.rating.length} reviews)
          </Typography>
        </Stack>

        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="#15892e">
            {tutor.rate} Coins/Min
          </Typography>
          <Button variant="contained" size="small" color='success' sx={{ borderRadius: 2 }}>
            Call Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TutorCard;
