import { Snackbar, TextField, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { firebase, auth } from "../firebase/firebase-config";
import { url } from "../global_variables/variables";

const Forgot = () => {
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [checkPassword, setCheckPassword] = useState(null);
    const [code, setCode] = useState('');
    const [uid, setUid] = useState();
    const [final, setFinal] = useState(false);
    const [state, setState] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const local = localStorage.getItem('token');

    const checkPhone = async () => {
        const check = await axios({
            method: 'get',
            url: url + 'users',
            params: {
                phone: phone
            }
        });
        if (check.data.status === 404) {
            if (phone === "") return;
            auth.signInWithPhoneNumber(`+${phone}`, window.verify).then((result) => {
                setFinal(result);
                setSnackbarMessage('Код подтверждения отправлен!');
                setSnackbarOpen(true);
            }).catch(err => {
                setSnackbarMessage('Ошибка при отправке кода');
                setSnackbarOpen(true);
            });
        } else {
            setSnackbarMessage('Такой номер уже существует!');
            setSnackbarOpen(true);
        }
    };

    const ValidOtp = () => {
        if (code === null || final === null) return;
        final.confirm(code).then((result) => {
            setUid(result.user.uid);
            setState(true);
            setSnackbarMessage('Код подтверждения подтвержден');
            setSnackbarOpen(true);
        }).catch((err) => {
            setSnackbarMessage('Код подтверждения введен неверно!');
            setSnackbarOpen(true);
        });
    };

    const ValidParams = () => {
        if (phone && password && checkPassword) {
            if (password === checkPassword) {
                RegisterUser(phone, password);
            } else {
                setSnackbarMessage('Пароли не совпадают!');
                setSnackbarOpen(true);
            }
        } else {
            setSnackbarMessage('Заполните все поля!');
            setSnackbarOpen(true);
        }
    };

    const RegisterUser = async (phone, password) => {
        const data = await axios({
            method: 'update',
            url: url + 'forgot-password',
            params: {
                phone: phone,
                password: password,
                uid: uid
            }
        });
        if (data.data.status === 200) {
            setSnackbarMessage('Пароль успешно изменен!');
            setSnackbarOpen(true);
            localStorage.setItem('token', uid);
            window.location.href = '/';
        } else {
            setSnackbarMessage('Что-то пошло не так! Попробуйте ещё раз :)');
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        window.verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        window.verify.render();
    }, []);

    return (
        <>
            {state ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center" style={{ marginTop: "100px" }}>
                            <div className="col-5 text-center bg-inf text-white p-3 px-5">
                                <h1>Новый пароль</h1>
                                <TextField
                                    label="Новый пароль"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    className="mt-4"
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        style: {
                                          color: 'black', // Text color
                                          backgroundColor: '#fff', // Background color for the input field
                                        },
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color: '#bbb', // Label color for dark mode
                                        },
                                      }}
                                      sx={{
                                        '& .MuiOutlinedInput-root': {
                                          '& fieldset': {
                                            borderColor: '#444', // Border color
                                          },
                                          '&:hover fieldset': {
                                            borderColor: '#777', // Border color when focused
                                          },
                                          '&.Mui-focused fieldset': {
                                            borderColor: '#fff', // Focused border color
                                          },
                                        },
                                      }}
                                />
                                <TextField
                                    label="Подтвердите пароль"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    className="mt-4"
                                    onChange={(e) => setCheckPassword(e.target.value)}
                                    InputProps={{
                                        style: {
                                          color: 'black', // Text color
                                          backgroundColor: '#fff', // Background color for the input field
                                        },
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color: '#bbb', // Label color for dark mode
                                        },
                                      }}
                                      sx={{
                                        '& .MuiOutlinedInput-root': {
                                          '& fieldset': {
                                            borderColor: '#444', // Border color
                                          },
                                          '&:hover fieldset': {
                                            borderColor: '#777', // Border color when focused
                                          },
                                          '&.Mui-focused fieldset': {
                                            borderColor: '#fff', // Focused border color
                                          },
                                        },
                                      }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className="mt-3"
                                    onClick={ValidParams}
                                >
                                    Изменить пароль
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center" style={{ marginTop: "100px" }}>
                            {final === false ?
                                <div className="col-6 text-center bg-inf text-white p-3 px-5">
                                    <h1>Телефонный номер</h1>
                                    <TextField
                                        label="Введите номер телефона"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        className="mt-4"
                                        onChange={(e) => setPhone(e.target.value)}
                                        InputProps={{
                                            style: {
                                              color: 'black', // Text color
                                              backgroundColor: '#fff', // Background color for the input field
                                            },
                                          }}
                                          InputLabelProps={{
                                            style: {
                                              color: '#bbb', // Label color for dark mode
                                            },
                                          }}
                                          sx={{
                                            '& .MuiOutlinedInput-root': {
                                              '& fieldset': {
                                                borderColor: '#444', // Border color
                                              },
                                              '&:hover fieldset': {
                                                borderColor: '#777', // Border color when focused
                                              },
                                              '&.Mui-focused fieldset': {
                                                borderColor: '#fff', // Focused border color
                                              },
                                            },
                                          }}
                                    />
                                    <div className="my-3 ml-xl-5" id="recaptcha-container"></div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className="mt-3"
                                        onClick={checkPhone}
                                    >
                                        Получить код
                                    </Button>
                                </div>
                                :
                                <div className="col-5 text-center bg-inf text-white p-3 px-5">
                                    <h1>Проверка кода</h1>
                                    <TextField
                                        label="Введите код подтверждения"
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        className="mt-4"
                                        onChange={(e) => setCode(e.target.value)}
                                        InputProps={{
                                            style: {
                                              color: 'black', // Text color
                                              backgroundColor: '#fff', // Background color for the input field
                                            },
                                          }}
                                          InputLabelProps={{
                                            style: {
                                              color: '#bbb', // Label color for dark mode
                                            },
                                          }}
                                          sx={{
                                            '& .MuiOutlinedInput-root': {
                                              '& fieldset': {
                                                borderColor: '#444', // Border color
                                              },
                                              '&:hover fieldset': {
                                                borderColor: '#777', // Border color when focused
                                              },
                                              '&.Mui-focused fieldset': {
                                                borderColor: '#fff', // Focused border color
                                              },
                                            },
                                          }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className="mt-3"
                                        onClick={ValidOtp}
                                    >
                                        Далее
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </>
    );
}

export default Forgot;
