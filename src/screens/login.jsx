// import { Snackbar, TextField, Button } from "@mui/material";
// import axios from "axios";
// import { url } from "../global_variables/variables";
// import { useEffect, useState } from "react";

// const Login = () => {
//     const [phone, setPhone] = useState(null);
//     const [password, setPassword] = useState(null);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const local = localStorage.getItem('token');

//     const ValidParams = () => {
//         if (phone != null && password != null) {
//             LoginUser(phone, password);
//         } else {
//             setSnackbarMessage('Баардык тааларды толтуруңуздар!');
//             setSnackbarOpen(true);
//         }
//     };

//     const LoginUser = async (phone, password) => {
//         try {
//             const data = await axios({
//                 method: 'get',
//                 url: url + 'user',
//                 params: {
//                     phone: phone,
//                     password: password
//                 }
//             });

//             if (data.data.status === 200) {
//                 localStorage.setItem('token', data.data.user[0].uid);
//                 window.location.href = '/';
//             } else {
//                 setSnackbarMessage('Логин же сыр сөз ката!');
//                 setSnackbarOpen(true);
//             }
//         } catch (error) {
//             setSnackbarMessage('Произошла ошибка. Попробуйте снова.');
//             setSnackbarOpen(true);
//         }
//     };

//     const checkLogged = async () => {
//         if (local == null) {
//             // window.location.href = '/';
//         } else {
//             window.location.href = '/list';
//         }
//     };

//     useEffect(() => {
//         checkLogged();
//     }, []);

//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-lg-12 d-lg-flex justify-content-center" style={{ marginTop: "100px" }}>
//                         <div className="col-lg-5 text-center bg-inf text-white p-3 px-5">
//                             <h1>Кирүү</h1>
//                             <TextField
//                                 label="Телефон номер"
//                                 variant="outlined"
//                                 fullWidth
//                                 className="mt-4"
//                                 onChange={(e) => setPhone(e.target.value)}
//                                 InputProps={{
//                                     style: {
//                                       color: 'black', // Text color
//                                       backgroundColor: '#fff', // Background color for the input field
//                                     },
//                                   }}
//                                   InputLabelProps={{
//                                     style: {
//                                       color: '#bbb', // Label color for dark mode
//                                     },
//                                   }}
//                                   sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                       '& fieldset': {
//                                         borderColor: '#444', // Border color
//                                       },
//                                       '&:hover fieldset': {
//                                         borderColor: '#777', // Border color when focused
//                                       },
//                                       '&.Mui-focused fieldset': {
//                                         borderColor: '#fff', // Focused border color
//                                       },
//                                     },
//                                   }}
//                             />
//                             <TextField
//                                 label="Сыр сөз"
//                                 type="password"
//                                 variant="outlined"
//                                 fullWidth
//                                 className="mt-4"
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 InputProps={{
//                                     style: {
//                                       color: 'black', // Text color
//                                       backgroundColor: '#fff', // Background color for the input field
//                                     },
//                                   }}
//                                   InputLabelProps={{
//                                     style: {
//                                       color: '#bbb', // Label color for dark mode
//                                     },
//                                   }}
//                                   sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                       '& fieldset': {
//                                         borderColor: '#444', // Border color
//                                       },
//                                       '&:hover fieldset': {
//                                         borderColor: '#777', // Border color when focused
//                                       },
//                                       '&.Mui-focused fieldset': {
//                                         borderColor: '#fff', // Focused border color
//                                       },
//                                     },
//                                   }}
//                             />
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 fullWidth
//                                 className="mt-3"
//                                 onClick={ValidParams}
//                             >
//                                 Кирүү
//                             </Button>
//                             <br />
//                             <a className="text-white" href="/forgot-password">Сыр сөздү унутунузбу?</a> | 
//                             <a className="text-white" href="/register">Каттоо</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={() => setSnackbarOpen(false)}
//                 message={snackbarMessage}
//             />
//         </>
//     );
// };

// export default Login;

import { Snackbar, Button } from "@mui/material";
import axios from "axios";
import { url } from "../global_variables/variables";
import { useEffect, useState } from "react";
import { firebase, auth } from "../firebase/firebase-config";

const Login = () => {
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const local = localStorage.getItem('token');

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;
            console.log('data', user);
            // Проверяем существование пользователя в нашей базе
            checkUserExists(user);
        } catch (error) {
            console.error('Google auth error:', error);
            setSnackbarMessage('Google менен кирүүдө ката кетти');
            setSnackbarOpen(true);
        }
    };

    const checkUserExists = async (user) => {
        try {
            const data = await axios({
                method: 'get',
                url: url + 'users',
                params: {
                    phone: user.uid
                }
            });
            console.log('data', user);
            
            if (data.data.status === 200) {
                // Если пользователь существует, входим
                localStorage.setItem('token', user.uid);
                window.location.href = '/';
            } else {
                // Если пользователя нет, перенаправляем на регистрацию
                setSnackbarMessage('Сиз катталган эмессиз. Каттоодон өтүңүз.');
                setSnackbarOpen(true);
                setTimeout(() => {
                    window.location.href = '/register';
                }, 2000);
            }
        } catch (error) {
            setSnackbarMessage('Сервер менен байланышууда ката кетти',error);
            setSnackbarOpen(true);
        }
    };

    const checkLogged = async () => {
        if (local != null) {
            window.location.href = '/list';
        }
    };

    useEffect(() => {
        checkLogged();
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 d-lg-flex justify-content-center" style={{ marginTop: "100px" }}>
                        <div className="col-lg-5 text-center bg-inf text-white p-3 px-5">
                            <h1>Кирүү</h1>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                className="mt-3"
                                onClick={signInWithGoogle}
                                style={{
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    padding: '10px'
                                }}
                            >
                                <img 
                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                                    alt="Google"
                                    style={{ 
                                        width: '18px', 
                                        height: '18px',
                                        marginRight: '10px'
                                    }}
                                />
                                Google менен кирүү
                            </Button>
                            <div className="mt-3">
                                <a className="text-white" href="/register">Каттоо</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </>
    );
};

export default Login;
