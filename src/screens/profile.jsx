import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, Typography, Button, TextField, Avatar, CircularProgress, Grid, Container } from '@mui/material';
import Header from '../components/header';
import axios from 'axios';
import { url } from '../global_variables/variables';

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState();
    const [balance, setBalance] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [message, setMessage] = useState({ open: false, text: '', severity: 'success' });

    const local = localStorage.getItem('token');

    const checkLogged = async () => {
        if (!local) {
            setUserDetails(null);
            return;
        }

        try {
            const { data } = await axios.get(`${url}user-details`, { params: { uid: local } });
            if (data.status === 200) {
                const user = data.user[0];
                setUserDetails(user);
                setImageUrl(user.avatar);
                setBalance(user.balance);
                setEmail(user.email);
                setPhone(user.phone);
            }
        } catch (error) {
            console.error('Колдонуучунун маалыматтарын алуу иши ишке ашпады:', error);
        }
    };

    useEffect(() => {
        checkLogged();
    }, []);

    const onChangePhoto = async () => {
        if (!avatar) return setMessage({ open: true, text: 'Сураныч, сүрөттү тандаңыз.', severity: 'warning' });

        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('oldAvatar', imageUrl);
        formData.append('id', userDetails.id);

        try {
            setLoading(true);
            const { data } = await axios.post(`${url}update-avatar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setLoading(false);
            if (data.status === 200) {
                setMessage({ open: true, text: 'Сүрөт ийгиликтүү жаңыртылды!', severity: 'success' });
                checkLogged();
            } else {
                setMessage({ open: true, text: 'Сүрөттү жаңыртуу ишке ашкан жок.', severity: 'error' });
            }
        } catch (error) {
            setLoading(false);
            console.error('Сүрөттү жаңыртууда ката кетти:', error);
            setMessage({ open: true, text: 'Сүрөттү жаңыртууда ката кетти.', severity: 'error' });
        }
    };

    const saveData = async () => {
        if (!phone || !email || !balance) return setMessage({ open: true, text: 'Бардык талааларды толтуруңуз.', severity: 'warning' });

        try {
            setLoading(true);
            const { data } = await axios({
                url: `${url}user-details`,
                method: 'update',
                params: {
                    balance,
                    id: userDetails.id,
                    email,
                    phone,
                }
            });
            setLoading(false);
            if (data.status === 200) {
                setMessage({ open: true, text: 'Маалыматтар ийгиликтүү сакталды!', severity: 'success' });
                checkLogged();
            } else {
                setMessage({ open: true, text: 'Маалыматтарды сактоо ишке ашкан жок.', severity: 'error' });
            }
        } catch (error) {
            setLoading(false);
            console.error('Маалыматтарды сактоодо ката кетти:', error);
            setMessage({ open: true, text: 'Маалыматтарды сактоодо ката кетти.', severity: 'error' });
        }
    };

    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                {userDetails ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" color="primary" align="center">
                                {`${userDetails.name} ${userDetails.lastname} ${userDetails.middlename || ''}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5} align="center">
                            <Avatar
                                src={`${url}/uploads/${userDetails.avatar}`}
                                alt={userDetails.name}
                                sx={{ width: 100, height: 100, mb: 2 }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setAvatar(e.target.files[0])}
                                style={{ display: 'none' }}
                                id="upload-button"
                            />
                            <label htmlFor="upload-button">
                                <Button variant="contained" component="span" fullWidth color="primary">
                                    Жаңы сүрөт тандаңыз
                                </Button>
                            </label>
                            <Typography variant="caption" color="error">
                                Сүрөт JPG форматында болушу керек.
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={onChangePhoto}
                                sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Сүрөттү жүктөө'}
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <TextField
                                label="Баланс"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Почта"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Телефон номери"
                                type="tel"
                                fullWidth
                                variant="outlined"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={saveData}
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Өзгөртүүлөрдү сактоо'}
                            </Button>
                            {userDetails.status == 0 ?
                                <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                                    Сиздин маалыматыңыз жок. Маалыматтарыңызды <a href="/edit">тизмеге кошуңуз</a>.
                                </Typography>
                                : <></>
                            }

                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                        Сиздин маалыматыңыз жок. Маалыматтарыңызды <a href="/edit">тизмеге кошуңуз</a>.
                    </Typography>
                )}
            </Container>

            <Snackbar
                open={message.open}
                autoHideDuration={6000}
                onClose={() => setMessage({ ...message, open: false })}
            >
                <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.severity} variant="filled">
                    {message.text}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Profile;
