// import { Snackbar, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
// import axios from "axios";
// import { url } from "../global_variables/variables";
// import { useEffect, useState } from "react";
// import { firebase, auth } from "../firebase/firebase-config";
// import RegLogo from '../img/Лого для сайт до регистрации.png';
// const Register = () => {
//     const [phone, setPhone] = useState();
//     const [password, setPassword] = useState();
//     const [name, setName] = useState();
//     const [lastName, setLastName] = useState();
//     const [passport, setPassport] = useState();
//     const [email, setEmail] = useState();
//     const [state, setState] = useState(false);
//     const [final, setFinal] = useState(false);
//     const [code, setCode] = useState('');
//     const [uid, setUid] = useState();
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const local = localStorage.getItem('token');

//     const checkPhone = async () => {
//         const check = await axios({
//             method: 'get',
//             url: url + 'users',
//             params: {
//                 phone: phone
//             }
//         });
//         console.log('phone check', check);
//         if (check.data.status === 404) {
//             auth.signInWithPhoneNumber(`+${phone}`, window.verify).then((result) => {
//                 setFinal(result);
//                 console.log('result auth', result);
//                 setSnackbarMessage('Код потверждения отправлен!');
//                 setSnackbarOpen(true);
//             }).catch((err) => {
//                 console.log('error', err);
//                 setSnackbarMessage('Ошибка при отправке кода');
//                 setSnackbarOpen(true);
//             })
//         } else {
//             setSnackbarMessage('Такой номер уже существует!');
//             setSnackbarOpen(true);
//         }
//     }

//     const ValidOtp = () => {
//         if (code === null || final === null) return;
//         final.confirm(code).then((result) => {
//             console.log("OTP", result);
//             setSnackbarMessage('Текшерүү код туура!');
//             setSnackbarOpen(true);
//             setUid(result.user.uid);
//             setState(true);
//             console.log('success ', result);
//         }).catch((err) => {
//             setSnackbarMessage('Текшерүү код туура эмес!');
//             setSnackbarOpen(true);
//         })
//     }

//     const ValidParams = () => {
//         if (phone && password && name && lastName && passport && email) {
//             RegisterUser(phone, password, name, lastName, passport, email);
//         } else {
//             setSnackbarMessage('Баардык тааларды толтуруңуз!');
//             setSnackbarOpen(true);
//         }
//     }

//     const RegisterUser = async (phone, password, name, lastName, passport, email) => {
//         const data = await axios({
//             method: 'post',
//             url: url + 'users',
//             params: {
//                 phone: phone,
//                 password: password,
//                 passport: passport,
//                 name: name,
//                 email: email,
//                 lastname: lastName,
//                 middlename: null,
//                 inn: null,
//                 uid: uid,
//                 id: null,
//                 balance: 0
//             }
//         })
//         console.log('register', data);
//         if (data.data.status === 200) {
//             window.location.href = '/';
//         } else {
//             setSnackbarMessage('Бирдеке туура эмес кетти, кайталап көрүңүз! :)');
//             setSnackbarOpen(true);
//         }
//     }

//     useEffect(() => {
//         window.verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//         window.verify.render();
//     }, []);

//     return (
//         <>
//             <div className="row">
//                 <div className="col-12 bg-inf p-4 mb-2"></div>
//                 <div className="col-12 d-flex justify-content-center">
//                     <img src={RegLogo} alt="" width={200} />
//                 </div>
//                 <div className="col-12 px-5 mt-4" style={{ fontSize: '12pt' }}>
//                     <div className="col-12 text-center"> “UNITY” платформага кош келиңиз!</div>
//                     - Бул компания 2023-жылдын Мамлекеттик тийиштүү каттоодон өтүп, өз ишмердүүлүгүн бир гана турак жай менен чектеген платформа. <br />
//                     - Бул платформа Кыргыз Республикасынын жарандарын ыктыярдуу бирикмесинин негизинде турак жайлуу болуусун жеңил жол менен уюштуруучу комерциялык эмес системалуу кооперативтик компания. <br />
//                     - Платформага көпчүлүк адамдардын бир жолку төлөмүнүн негизинде бир канча талаптарга ылайык, биринчи кезекте турган адамдын каржылык абалына жараша турак жай менен камсыз кылуу системасы киргизилген. <br />
//                     - Платформадагы кезек адамдын каржылык абалына көз каранды. Канчалык каражатыңызды көп белгилесеңиз ошончолук кезек алдыда. <br />
//                     - Бул веб сайтты колдонуп өзүңүздүн жана башкалардын турак жай үчүн бир жолку төлөнгөн каражаты кантип каяка жумшалып жатканын көзөмөлгө алуу мүмкүнчүлүгү камтылганын байкайсыз. Ошол менен бирге жеке адам каттоодон өттүшү менен качан жана кантип кандай каражат менен турак жайлуу болорун аныктай алат.
//                     - Платформа негизинен жарандардын турак жай муктаждыктарын колгоо алуу коомдун турак жайга болгон тең салмактуулугун сактоо максатта түзүлдү. Биздин принцип Кыргыз Республикасынын жарандары Кыргыз Республикасынын аймагында турак жайсыз болбошу керек дегенге максималдуу форма түзүү.
//                     - Бул платформа аркылуу эч бир турак жайга ээлик кылбаган Кыргыз Республикасынын жарандары гана турак жайга болгон талаптардын жана чектөөлөрдүн негизинде үйлүү болууга каттоого тура алышат.
//                     - Каттоого турган күндөн тартып сиз веп сайт аркылуу онлайн каржылык абалыңызды эске алып кезегиңизди алдыга жылдыруу менен башкара аласыз.
//                     - Компаниянын жалпы кирешеси жана алып берүүчү турак жай 100% кезеке турган адамдардын акчасы менен каржыланат.
//                     - Негизинен кооперативдер коммерциялык жана коммерциялык эмес болуп 2 түргө бөлүнөт. 1) Коммерциялык кооперативдерге пайда табууну көздөгөн (ЖККР 82-берене, пункт-1) өндүрүш жана тейлөө кооперативдери кирет. Мисалы айыл-чарба кооперативдери, финансы кооперативдери ж.б. Ал эми коммерциялык эмес кооперативдер-пайда табууну көздөбөгөн жана алынган пайданы катышуучулардын ортосунда бөлүштүрбөгөн (ЖККР 82-берене, пункт-1), өздөрүнүн уставындагы максаттарга зарыл болгон өлчөмдө гана ишкердик кылган кооперативдер кирет. Коммерциялык эмес кооперативдерди жалпы жонунан керектөөчүлөрдүн кооперативи деп аташат.
//                     - Биздин платформанын ишмердүүлүгү менен толук таанышуу үчүн каттоодон (ссылка каттоо) өтүңүз.
//                 </div>
//             </div>

//             {state ? (
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-12 d-flex justify-content-center" style={{ marginTop: "100px" }}>
//                             <div className="col-6 text-center bg-inf text-white p-3 px-5">
//                                 <h1 className="text-center">КАТТОО</h1>
//                                 <TextField label="Аты" variant="outlined" fullWidth className="mt-4" onChange={(e) => setName(e.target.value)} />
//                                 <TextField label="Фамилиясы" variant="outlined" fullWidth className="mt-4" onChange={(e) => setLastName(e.target.value)} />
//                                 <TextField label="КР паспорт номериңиз" variant="outlined" fullWidth className="mt-4" onChange={(e) => setPassport(e.target.value)} />
//                                 <TextField label="E-mail" variant="outlined" fullWidth className="mt-4" onChange={(e) => setEmail(e.target.value)} />
//                                 <TextField label="Сыр сөз" type="password" variant="outlined" fullWidth className="mt-4" onChange={(e) => setPassword(e.target.value)} />
//                                 <TextField label="Сыр сөздү кайталаңыз" type="password" variant="outlined" fullWidth className="mt-4" />
//                                 <Button variant="contained" color="primary" fullWidth className="mt-3" onClick={ValidParams}>
//                                     Каттоо
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-12 d-flex justify-content-center" style={{ marginTop: "100px" }}>
//                             {final === false ? (
//                                 <div className="col-6 text-center bg-inf text-white p-3 px-5">
//                                     <h1 className="text-center">Телефон номериниз</h1>
//                                     <TextField 
//                                     label="Номер телефона без +" 
//                                     type="number" 
//                                     variant="outlined" 
//                                     fullWidth className="mt-4" 
//                                     onChange={(e) => setPhone(e.target.value)} 
//                                     InputProps={{
//                                         style: {
//                                           color: 'black', // Text color
//                                           backgroundColor: '#fff', // Background color for the input field
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: {
//                                           color: '#bbb', // Label color for dark mode
//                                         },
//                                       }}
//                                       sx={{
//                                         '& .MuiOutlinedInput-root': {
//                                           '& fieldset': {
//                                             borderColor: '#444', // Border color
//                                           },
//                                           '&:hover fieldset': {
//                                             borderColor: '#777', // Border color when focused
//                                           },
//                                           '&.Mui-focused fieldset': {
//                                             borderColor: '#fff', // Focused border color
//                                           },
//                                         },
//                                       }}
//                                     />
//                                     <FormControlLabel control={<Checkbox />} label="Макулдашылган шарттарды кабыл алам" />
//                                     <div className="my-3 ml-xl-5" id="recaptcha-container"></div>
//                                     <Button variant="contained" color="primary" fullWidth className="mt-3" onClick={checkPhone}>
//                                         Текшерүү кодун алуу
//                                     </Button>
//                                 </div>
//                             ) : (
//                                 <div className="col-5 text-center bg-inf text-white p-3 px-5">
//                                     <h1 className="text-center">Текшерүү кодун ырастоо</h1>
//                                     <TextField label="Код подтверждения" 
//                                     type="number" 
//                                     variant="outlined" fullWidth className="mt-4" 
//                                     onChange={(e) => setCode(e.target.value)} 
//                                     InputProps={{
//                                         style: {
//                                           color: 'black', // Text color
//                                           backgroundColor: '#fff', // Background color for the input field
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: {
//                                           color: '#bbb', // Label color for dark mode
//                                         },
//                                       }}
//                                       sx={{
//                                         '& .MuiOutlinedInput-root': {
//                                           '& fieldset': {
//                                             borderColor: '#444', // Border color
//                                           },
//                                           '&:hover fieldset': {
//                                             borderColor: '#777', // Border color when focused
//                                           },
//                                           '&.Mui-focused fieldset': {
//                                             borderColor: '#fff', // Focused border color
//                                           },
//                                         },
//                                       }}
//                                     />
//                                     <Button variant="contained" color="primary" fullWidth className="mt-3" onClick={ValidOtp}>
//                                         Текшерүү кодун ырастоо
//                                     </Button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={() => setSnackbarOpen(false)}
//                 message={snackbarMessage}
//             />
//         </>
//     );
// };

// export default Register;

import { Snackbar, TextField, Button } from "@mui/material";
import axios from "axios";
import { url } from "../global_variables/variables";
import { useState } from "react";
import { firebase, auth } from "../firebase/firebase-config";
import RegLogo from '../img/Лого для сайт до регистрации.png';

const Register = () => {
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [passport, setPassport] = useState();
    const [email, setEmail] = useState();
    const [state, setState] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [uid, setUid] = useState();

    const signInWithGoogle = async () => {

        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;
            setUid(user.uid);
            setEmail(user.email);
            setName(user.displayName?.split(' ')[0] || '');
            setLastName(user.displayName?.split(' ')[1] || '');
            console.log('result', user);

            // setState(true);
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
                setSnackbarMessage('Google аккаунт ийгиликтүү байланды!');
                setSnackbarOpen(true);
                localStorage.setItem('token', user.uid);
                window.location.href = '/edit';
            } else {
                // Если пользователя нет, перенаправляем на регистрацию
                setSnackbarMessage('Сиз катталган эмессиз. Каттоодон өтүңүз.');
                setState(true);
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage('Сервер менен байланышууда ката кетти', error);
            setSnackbarOpen(true);
        }
    };

    // Остальной код остается тем же
    const ValidParams = () => {
        if (name && lastName && passport && email) {
            RegisterUser(password, name, lastName, passport, email);
        } else {
            setSnackbarMessage('Баардык тааларды толтуруңуз!');
            setSnackbarOpen(true);
        }
    }

    const RegisterUser = async (name, lastName, passport, email) => {
        try {
            const data = await axios({
                method: 'post',
                url: url + 'users',
                params: {
                    password: null,
                    passport: passport,
                    name: name,
                    email: email,
                    lastname: lastName,
                    middlename: null,
                    inn: null,
                    uid: uid,
                    id: null,
                    balance: 0
                }
            });

            if (data.data.status === 200) {
                window.location.href = '/';
            } else {
                setSnackbarMessage('Бирдеке туура эмес кетти, кайталап көрүңүз! :)');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setSnackbarMessage('Каттоодо ката кетти');
            setSnackbarOpen(true);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-12 bg-inf p-4 mb-2"></div>
                <div className="col-12 d-flex justify-content-center">
                    <img src={RegLogo} alt="" width={200} />
                </div>
                <div className="col-12 px-5 mt-4 rounded shadom-sm" style={{ fontSize: '12pt' }}>
                    <div className="col-12 text-center fs-4 fw-3">"UNITY" платформага кош келиңиз!</div>
                    - Бул компания 2023-жылдын Мамлекеттик тийиштүү каттоодон өтүп, өз ишмердүүлүгүн бир гана турак жай менен чектеген платформа. <br />
                    - Бул платформа Кыргыз Республикасынын жарандарын ыктыярдуу бирикмесинин негизинде турак жайлуу болуусун жеңил жол менен уюштуруучу комерциялык эмес системалуу кооперативтик компания. <br />
                    - Платформага көпчүлүк адамдардын бир жолку төлөмүнүн негизинде бир канча талаптарга ылайык, биринчи кезекте турган адамдын каржылык абалына жараша турак жай менен камсыз кылуу системасы киргизилген. <br />
                    - Платформадагы кезек адамдын каржылык абалына көз каранды. Канчалык каражатыңызды көп белгилесеңиз ошончолук кезек алдыда. <br />
                    - Бул веб сайтты колдонуп өзүңүздүн жана башкалардын турак жай үчүн бир жолку төлөнгөн каражаты кантип каяка жумшалып жатканын көзөмөлгө алуу мүмкүнчүлүгү камтылганын байкайсыз. Ошол менен бирге жеке адам каттоодон өттүшү менен качан жана кантип кандай каражат менен турак жайлуу болорун аныктай алат.
                    - Платформа негизинен жарандардын турак жай муктаждыктарын колгоо алуу коомдун турак жайга болгон тең салмактуулугун сактоо максатта түзүлдү. Биздин принцип Кыргыз Республикасынын жарандары Кыргыз Республикасынын аймагында турак жайсыз болбошу керек дегенге максималдуу форма түзүү.
                    - Бул платформа аркылуу эч бир турак жайга ээлик кылбаган Кыргыз Республикасынын жарандары гана турак жайга болгон талаптардын жана чектөөлөрдүн негизинде үйлүү болууга каттоого тура алышат.
                    - Каттоого турган күндөн тартып сиз веп сайт аркылуу онлайн каржылык абалыңызды эске алып кезегиңизди алдыга жылдыруу менен башкара аласыз.
                    - Компаниянын жалпы кирешеси жана алып берүүчү турак жай 100% кезеке турган адамдардын акчасы менен каржыланат.
                    - Негизинен кооперативдер коммерциялык жана коммерциялык эмес болуп 2 түргө бөлүнөт. 1) Коммерциялык кооперативдерге пайда табууну көздөгөн (ЖККР 82-берене, пункт-1) өндүрүш жана тейлөө кооперативдери кирет. Мисалы айыл-чарба кооперативдери, финансы кооперативдери ж.б. Ал эми коммерциялык эмес кооперативдер-пайда табууну көздөбөгөн жана алынган пайданы катышуучулардын ортосунда бөлүштүрбөгөн (ЖККР 82-берене, пункт-1), өздөрүнүн уставындагы максаттарга зарыл болгон өлчөмдө гана ишкердик кылган кооперативдер кирет. Коммерциялык эмес кооперативдерди жалпы жонунан керектөөчүлөрдүн кооперативи деп аташат.
                    - Биздин платформанын ишмердүүлүгү менен толук таанышуу үчүн каттоодон (ссылка каттоо) өтүңүз.
                </div>
            </div>
            {state ? (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center" style={{ marginTop: "100px" }}>
                            <div className="col-6 text-center bg-inf text-white p-2 px-5">
                                <h1 className="text-center">КАТТОО</h1>
                                <TextField
                                    label="Аты"
                                    variant="outlined"
                                    fullWidth
                                    className="mt-4"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    InputProps={{
                                        style: { color: 'black', backgroundColor: '#fff' },
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#bbb' },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#444' },
                                            '&:hover fieldset': { borderColor: '#777' },
                                            '&.Mui-focused fieldset': { borderColor: '#fff' },
                                        },
                                    }}
                                />
                                <TextField
                                    label="Фамилиясы"
                                    variant="outlined"
                                    fullWidth
                                    className="mt-4"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    InputProps={{
                                        style: { color: 'black', backgroundColor: '#fff' },
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#bbb' },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#444' },
                                            '&:hover fieldset': { borderColor: '#777' },
                                            '&.Mui-focused fieldset': { borderColor: '#fff' },
                                        },
                                    }}
                                />
                                <TextField
                                    label="КР паспорт номериңиз"
                                    variant="outlined"
                                    fullWidth
                                    className="mt-4"
                                    onChange={(e) => setPassport(e.target.value)}
                                    InputProps={{
                                        style: { color: 'black', backgroundColor: '#fff' },
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#bbb' },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#444' },
                                            '&:hover fieldset': { borderColor: '#777' },
                                            '&.Mui-focused fieldset': { borderColor: '#fff' },
                                        },
                                    }}
                                />
                                <TextField
                                    label="E-mail"
                                    variant="outlined"
                                    fullWidth
                                    className="mt-4"
                                    value={email}
                                    disabled
                                    InputProps={{
                                        style: { color: 'black', backgroundColor: '#fff' },
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#bbb' },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#444' },
                                            '&:hover fieldset': { borderColor: '#777' },
                                            '&.Mui-focused fieldset': { borderColor: '#fff' },
                                        },
                                    }}
                                />
                                <Button variant="contained" color="primary" fullWidth className="mt-3" onClick={ValidParams}>
                                    Каттоо
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center" style={{ marginTop: "10px" }}>
                            <div className="col-12 col-md-6 text-center bg-inf text-white p-2 px-5">
                                <h1 className="text-center">Google аркылуу кирүү</h1>
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
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </>
    );
};

export default Register;
