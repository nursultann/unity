import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../global_variables/variables";
import logo from '../img/Лого для сайт.png';

const Header = () => {
    const local = localStorage.getItem('token');
    const [userDetails, setUserDetails] = useState(null);
    const LogOut = ()=>{
        localStorage.removeItem('token');
        window.location.href = '/';
    }
    const checkLogged = async () => {
        if (local == null) {
            setUserDetails(null);
            window.location.href = '/';
        } else {
            const data = await axios({
                url:url+'user-details',
                method: 'get',
                params: {
                    uid:local,
                }
            });
            console.log('local',data);
        }
    }
    useEffect(() => {
        checkLogged();
    }, []);
    return (
        <>
            <div className="row">
                <div className="col-12 bg-inf mb-5">
                    <div className="col-12">
                        <div className="row py-3">
                            <div className="col-4">
                                <img className="ms-5" src={logo} alt="" width={'100'} />
                            </div>
                            <div className="col-4">
                            <h2 className="text-center text-white">Unity</h2>    
                            </div>
                            <div className="col-4 text-end">
                                <a className="btn btn-light border" href="/profile">Личный кабинет</a>
                                <a className="btn btn-light border ms-2" onClick={LogOut} href="#">Выйти из профиля</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-around py-4">
                        <a className="btn btn-light border" href="/chat">Общий чат</a>
                        <a className="btn btn-light border" href="/list">Список</a>
                        <a className="btn btn-light border" href="/about-us">Информация о компании</a>
                        <a className="btn btn-light border" href="/content">Видео и фото</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;
