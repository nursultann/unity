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
                            <div className="col-3">
                                <img className="ms-5" src={logo} alt="" width={'100'} />
                            </div>
                            <div className="col-6">
                            <h1 className="text-center text-white" style={{fontSize : '30pt'}}>Жилищный кооператив</h1>    
                            </div>
                            <div className="col-3 text-end">
                                <a className="badge border bg-light text-inf px-4" href="/profile">Личный кабинет</a>
                                <a className="badge border bg-light text-inf px-4 ms-2" onClick={LogOut} href="#">Выйти из профиля</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center py-4">
                        <div className="col-8 d-flex justify-content-around">
                        <a className="badge border-dark bg-light text-inf px-5" href="/chat">Общий чат</a>
                        <a className="badge border bg-light text-inf px-5" href="/list">Список</a>
                        <a className="badge border bg-light text-inf px-5" href="/about-us">Информация о компании</a>
                        <a className="badge border bg-light text-inf px-5" href="/content">Видео и фото</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;
