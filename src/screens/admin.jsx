import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../global_variables/variables";
import { message } from "antd";

const Admin = () => {
    const [user, setUser] = useState();
    const [login,setLogin] = useState();
    const [password,setPassword]= useState();
    const local = localStorage.getItem('adminToken');
    if(local != null){
        window.location.href = '/admin-console';
    }
    const Login = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'admin-details',
            params:{
                'login':login,
                'password':password
            }
        });
        console.log('login', data);
        if(data.data.status == 200){
            localStorage.setItem('adminToken', data.data.user[0].id);
            window.location.href = '/admin-console';
        }else{
            message.error('Неправильный логин или пароль!', 3);
        }
    }
    return (
        <div className="container">
            <div className="col-12 d-flex justify-content-center">
                <div className="col-6 bg-info p-5" style={{marginTop : "150px"}}>
                    <h3 className="text-center text-white">Вход в Админ</h3>
                    <input className="form-control" type="text" placeholder="Логин" onChange={(e)=>setLogin(e.target.value)} />
                    <br />
                    <input className="form-control" type="text" placeholder="Пароль" onChange={(e)=>setPassword(e.target.value)} />
                    <br />
                    <button className="btn btn-light" onClick={Login}>
                        Войти
                    </button>
                </div>
            </div>
        </div>

    );
}
export default Admin;