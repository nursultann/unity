import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { firebase,auth } from "../firebase/firebase-config";
import { url } from "../global_variables/variables";

const Forgot = ()=>{
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
            if (phone === "") return;
            auth.signInWithPhoneNumber(`+${phone}`, window.verify).then((result) => {
                setFinal(result);
                console.log('result auth', result);
                message.success('Код потверждения отправлен!', 10);
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
            RegisterUser(phone, password);
        } else {
            message.warning('Заполните все поля!', 2000);
        }
    }
    const RegisterUser = async (phone, password) => {
        const data = await axios({
            method: 'get',
            url: url + 'forgot-password',
            params: {
                phone: phone,
                password: password,
                uid: uid
            }
        })
        console.log('forgot-password', data);
        if (data.data.status == 200) {
            localStorage.setItem('token',data.data.user[0].uid);
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
    }, []);
    return(
        <>
            {state ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center" style={{ marginTop: "100px" }}>
                            <div className="col-5 text-center bg-inf text-white p-3 px-5">
                                <h1 className="text-center">Новый пароль</h1>
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
                                    <div className="col-6 text-center bg-inf text-white p-3 px-5">
                                        <h1 className="text-center">Номер телефона</h1>
                                        <input type="number" placeholder="Номер телефона" className="form-control mt-4" onChange={(e) => setPhone(e.target.value)} />
                                        <br />
                                        <div className="my-3 ml-xl-5" id="recaptcha-container"></div><br />
                                        <a href="#" className="btn btn-primary mt-3" onClick={checkPhone}>Получить код подтверждения</a>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-5 text-center bg-info text-white p-3 px-5">
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
export default Forgot;