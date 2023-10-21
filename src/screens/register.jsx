import axios from "axios";
import { url } from "../global_variables/variables";
import { message } from "antd";
import { useEffect, useState } from "react";
import { firebase, auth } from "../firebase/firebase-config";
import RegLogo from '../img/Лого для сайт до регистрации.png';
const Register = () => {
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [passport, setPassport] = useState();
    const [email, setEmail] = useState();
    const [state, setState] = useState(false);
    const [final, setFinal] = useState(false);
    const [code, setCode] = useState('');
    const [uid, setUid] = useState();
    const local = localStorage.getItem('token');
    const checkPhone = async () => {
        const check = await axios({
            method: 'get',
            url: url + 'users',
            params: {
                phone: phone
            }
        });
        console.log('phone check', check);
        if (check.data.status == 404) {
            // if (phone != "") return;
            auth.signInWithPhoneNumber(`+${phone}`, window.verify).then((result) => {
                setFinal(result);
                console.log('result auth', result);
                message.success('Код потверждения отправлен!', 10);
            }).catch((err) => {
                console.log('error', err);
            })
        } else {
            message.warning('Такой номер уже существует!', 10);
        }
    }
    const ValidOtp = () => {
        if (code === null || final === null)
            return;
        final.confirm(code).then((result) => {
            console.log("OTP", result);
            message.success('Код потверждения подтвержден', 10);
            setUid(result.user.uid);
            setState(true);
            // result.user.uuid;
            console.log('success ', result);
        }).catch((err) => {
            message.error('Код потверждения введен неверно!', 10);
        })
    }
    const ValidParams = () => {
        if (phone != null && password != null) {
            RegisterUser(phone, password, name, lastName, passport, email);
        } else {
            message.warning('Заполните все поля!', 2000);
        }
    }
    const RegisterUser = async (phone, password, name, lastName, passport, email) => {
        const data = await axios({
            method: 'post',
            url: url + 'users',
            params: {
                phone: phone,
                password: password,
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
        })
        console.log('register', data);
        if (data.data.status == 200) {
            window.location.href = '/';
        } else {
            message.warning('Что-то пошло не так! Попробуйте ещё раз :)', 2000);
        }
    }
    useEffect(() => {
        window.verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        window.verify.render();
    }, []);
    // const checkLogged = async () => {
    //     if (local == null) {
    //         window.location.href = '/';
    //     } else {
    //         window.location.href = '/list';
    //     }
    // }
    useEffect(() => {
        // checkLogged();
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-12 bg-inf p-4 mb-2">
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <img src={RegLogo} alt="" width={100} />
                </div>
                <div className="col-12 px-5 mt-4">
                    - 01.10.2023 компания официально прошла гос.регистрацию. Платформа будет работать только в сфере недвижимости
                    <br />
                    - Это платформа является не коммерческой организацией, а, систематическим кооперативом для  удобства граждан
                    Кыргызской республики в приобретении недвижимости.
                    <br />
                    - Очередь платформы зависит от финансового состояние человека. Т е чем больше внесли сумму, тем очередь двинется в перед.
                    <br />
                    - На веб сайте можно увидеть куда и на что тратиться ваш первоначальный взнос.
                    Вместе с этим, каждый человек после регистрации может уточнить когда и с каким бюджетом может приобрести недвижимость.
                    <br />
                    - С помощью этой платформы, граждане Кыргызской республики которые не имеют недвижимость,
                    соблюдая требовании и ограничении могут зарегистрироваться для приобретения недвижимости..
                    <br />
                    - Со дня регистрации, на веб сайте вы можете онлайн контролировать  свое финансовое состояние и управлять очередью.
                    <br />
                    - Общий доход компании и приобретение недвижимости 100% финансируется  за счет тех кто в очередь
                    <br />
                    - Кооперативы делятся на 2: 1) коммерческая 2) некоммерческая. 1) основная цель коммерческого кооператив заработать
                    ( ЖККР 82-статья пункт-1) : производственный и регистрационный кооператив. Например: сельскохозяйственный кооператив,
                    финансовый кооператив и т д. 2) а цель некоммерческого кооператив не заработать для себя и не поделить доход
                    между участниками ( жккр 82-Ст п-1) а, работать по уставу.  Некоммерческих кооператив по другому еще называют ….
                    <br />
                    - Чтобы по подробнее ознакомиться с нашей платформой пройдите регистрацию
                </div>
            </div>
            {state ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center" style={{ marginTop: "100px" }}>
                            <div className="col-4 text-center bg-inf text-white p-3 px-5">
                                <h1 className="text-center">Регистрация</h1>
                                <input type="text" placeholder="Имя" className="form-control mt-4" onChange={(e) => setName(e.target.value)} />
                                <input type="text" placeholder="Фамилия" className="form-control mt-4" onChange={(e) => setLastName(e.target.value)} />
                                <input type="text" placeholder="Номер паспорта КР" className="form-control mt-4" onChange={(e) => setPassport(e.target.value)} />
                                <input type="email" placeholder="E-mail" className="form-control mt-4" onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder="Пароль" className="form-control mt-4" onChange={(e) => setPassword(e.target.value)} />
                                <input type="password" placeholder="Повторить пароль" className="form-control mt-4" />
                                <br />
                                <a href="#" className="btn btn-primary mt-3" onClick={ValidParams}>Зарегистрироваться</a>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center" style={{ marginTop: "100px" }}>
                            {final == false ?
                                <>
                                    <div className="col-4 text-center bg-inf text-white p-3 px-5">
                                        <h1 className="text-center">Номер телефона</h1>
                                        <input type="number" placeholder="Номер телефона" className="form-control mt-4" onChange={(e) => setPhone(e.target.value)} />
                                        <br />
                                        <input type="checkbox" name="" id="" /> Принять условия соглашения <br />
                                        <div className="my-3 ml-xl-5" id="recaptcha-container"></div><br />
                                        <a href="#" className="btn btn-primary mt-3" onClick={checkPhone}>Получить код подтверждения</a>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-5 text-center bg-inf text-white p-3 px-5">
                                        <h1 className="text-center">Подтвердить код подтверждения</h1>
                                        <input type="number" placeholder="Код подтверждения" defaultValue='' className="form-control mt-4" onChange={(e) => setCode(e.target.value)} />
                                        <br />
                                        <a href="#" className="btn btn-primary mt-3" onClick={ValidOtp}>Подтвердить код</a>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Register;