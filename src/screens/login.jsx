import axios from "axios";
import { url } from "../global_variables/variables";
import { message } from "antd";
import { useEffect, useState } from "react";

const Login = () => {
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const local = localStorage.getItem('token');
    const ValidParams = () => {
        if (phone != null && password != null) {
            LoginUser(phone, password);
        } else {
            message.warning('Баардык тааларды толтуруңуздар!', 2000);
        }
    }
    const LoginUser = async (phone, password) => {
        const data = await axios({
            method: 'get',
            url: url + 'user',
            params: {
                phone: phone,
                password: password
            }
        });
        console.log('data', data);
        if (data.data.status == 200) {
            localStorage.setItem('token', data.data.user[0].uid);
            window.location.href = '/';
        } else {
            message.error('Логин же сыр сөз ката!', 5);
        }
    }
    const checkLogged = async () => {
        if (local == null) {
            // window.location.href = '/';
        } else {
            window.location.href = '/list';
        }
    }
    useEffect(() => {
        checkLogged();
    }, []);
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 d-lg-flex justify-content-center" style={{ marginTop: "100px" }}>
                        <div className="col-lg-5 text-center bg-inf text-white p-3 px-5">
                            <h1 className="text-center">Кирүү</h1>
                            <input type="text" placeholder="996555112233" className="form-control mt-4" onChange={(e) => setPhone(e.target.value)} />
                            <input type="text" placeholder="Сыр сөз" className="form-control mt-4" onChange={(e) => setPassword(e.target.value)} />
                            <a onClick={ValidParams} className="btn btn-primary mt-3">Кирүү</a><br />
                            <a className="text-white" href="/forgot-password">Сыр сөздү унутунузбу?</a> | <a className="text-white" href="/register">Каттоо</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;