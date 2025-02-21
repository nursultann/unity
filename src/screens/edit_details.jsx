import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
  Snackbar,
  Alert,
  Divider,
  Stack
} from '@mui/material';
import Header from '../components/header';
import axios from 'axios';
import { url } from '../global_variables/variables';
import { Upload, User } from 'lucide-react';

const Edit = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [uid] = useState(localStorage.getItem('token'));
  const [inn, setInn] = useState('');
  const [passport, setPassport] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [balance, setBalance] = useState('');
  const [pass_date_issue, setPassIssue] = useState('');
  const [pass_expiry_date, setPassExpiry] = useState('');
  const [pass_photo, setPassPhoto] = useState('');
  const [pass_photo_back, setPassPhotoBack] = useState('');
  const [birthday, setBirthday] = useState('');
  const [user, setUser] = useState(null);
  const [main, setMain] = useState(null);
  const [service, setService] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const getUserDetails = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `${url}user-details`,
        params: { uid }
      });
      
      if (data.status === 200 && data.user?.[0]) {
        const userDetails = data.user[0];
        setUser(userDetails);
        setName(userDetails.name || '');
        setLastName(userDetails.lastname || '');
        setAvatar(userDetails.avatar || '');
        setBalance(userDetails.balance || '');
        setBirthday(userDetails.birthday || '');
        setEmail(userDetails.email || '');
        setInn(userDetails.inn || '');
        setPassport(userDetails.passport || '');
        setMiddleName(userDetails.middlename || '');
        setPassExpiry(userDetails.pass_expiry_date || '');
        setPassIssue(userDetails.pass_date_issue || '');
        setPassPhoto(userDetails.pass_photo || '');
        setPassPhotoBack(userDetails.pass_photo_back || '');
        setAddress(userDetails.address || '');
      }
    } catch (error) {
      showSnackbar('Маалыматты жүктөөдө ката кетти', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const validateForm = () => {
    if (!name || !lastName || !inn || !passport || !address || !email || !birthday || 
        !pass_date_issue || !pass_expiry_date || !pass_photo || !pass_photo_back) {
      showSnackbar('Бардык талааларды толтуруу керек', 'error');
      return false;
    }
    
    if (balance > 1000000) {
      showSnackbar('Максималдуу сумма 1,000,000!', 'error');
      return false;
    }
    
    return true;
  };

  const postDetails = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('lastname', lastName);
      formData.append('middlename', middleName || '');
      formData.append('uid', uid);
      formData.append('inn', inn);
      formData.append('passport', passport);
      formData.append('address', address);
      formData.append('email', email);
      formData.append('avatar', avatar);
      formData.append('pass_date_issue', pass_date_issue);
      formData.append('pass_expiry_date', pass_expiry_date);
      formData.append('pass_photo', pass_photo);
      formData.append('pass_photo_back', pass_photo_back);
      formData.append('birthday', birthday);
      formData.append('balance', balance);

      const { data } = await axios({
        method: 'post',
        data: formData,
        url: `${url}user-details`,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.status === 200) {
        showSnackbar('Ийгиликтүү сакталды!');
        window.location.href = '/invoice';
      } else {
        showSnackbar('Сактоо ишке ашкан жок!', 'error');
      }
    } catch (error) {
      showSnackbar('Сактоодо ката кетти', 'error');
    }
  };

  const getBalance = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `${url}balance-update`
      });
      
      if (data.status === 200 && data.balance?.[0]) {
        setMain(data.balance[0].main_sum);
        setService(data.balance[0].service_painment);
      }
    } catch (error) {
      console.error('Balance fetch error:', error);
    }
  };

  useEffect(() => {
    getUserDetails();
    getBalance();
  }, []);

  const handleFileChange = (setter) => (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setter(file);
    }
  };

  return (
    <>
      <Header />
      {user && (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'medium' }}>
              Профиль жөндөөлөрү
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                    textAlign: 'center'
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main'
                    }}
                    src={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
                  >
                    <User size={60} />
                  </Avatar>
                  
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<Upload />}
                    sx={{ mb: 1 }}
                    fullWidth
                  >
                    Сүрөт жүктөө
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange(setAvatar)}
                      accept="image/*"
                    />
                  </Button>
                  <Typography variant="caption" color="text.secondary">
                    Сунушталат: Чарчы сүрөт, максимум 5МБ
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Жеке маалымат
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Аты"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Фамилиясы"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Атасынын аты"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Документ маалыматы
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Паспорт номери"
                      value={passport}
                      disabled
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="ИНН"
                      value={inn}
                      onChange={(e) => setInn(e.target.value)}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Берилген күнү"
                      type="date"
                      value={pass_date_issue}
                      onChange={(e) => setPassIssue(e.target.value)}
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Жарактуу мөөнөтү"
                      type="date"
                      value={pass_expiry_date}
                      onChange={(e) => setPassExpiry(e.target.value)}
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<Upload />}
                    fullWidth
                  >
                    Паспорттун алдын жүктөө
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange(setPassPhoto)}
                    />
                  </Button>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<Upload />}
                    fullWidth
                  >
                    Паспорттун артын жүктөө
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange(setPassPhotoBack)}
                    />
                  </Button>
                </Stack>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Байланыш маалыматы
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Дареги"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Электрондук почта"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      required
                      variant="outlined"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Туулган күнү"
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                size="large"
                onClick={postDetails}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: 2
                }}
              >
                Сактоо
              </Button>
            </Box>
          </Paper>
        </Container>
      )}
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Edit;