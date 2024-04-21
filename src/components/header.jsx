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
                <div className="col-12 bg-inf px-0 mb-2 d-none d-lg-block px-0">
                    <div className="col-12">
                        <div className="row py-3">
                            <div className="col-3">
                                <img className="ms-5" src={logo} alt="" width={'100'} />
                            </div>
                            <div className="col-6">
                            <h1 className="text-center text-white title" style={{fontSize : '30pt', fontWeight : 'bolder'}}>ТУРАК ЖАЙ КООПЕРАТИВИ</h1>
                            </div>
                            <div className="col-3 text-end">
                                <a className="badge border bg-light text-inf px-4" href="/profile">Жеке кабинет</a>
                                <a className="badge border bg-light text-inf px-4 ms-2" onClick={LogOut} href="#">Профилден чыгуу</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center py-4">
                        <div className="col-8 d-flex justify-content-around">
                        <a className="badge border bg-light text-inf px-5" href="/chat">Баарлашуу</a>
                        <a className="badge border bg-light text-inf px-5" href="/list">Каттоо тизме</a>
                        <a className="badge border bg-light text-inf px-5" href="/about-us">Биз жөнүндө</a>
                        <a className="badge border bg-light text-inf px-5" href="/content">Сүрөт/видео</a>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-block d-lg-none px-0">
                    <nav class="navbar navbar-expand-lg bg-inf navbar-dark">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="/"><img className="ms-1" src={logo} alt="" width={'50'} /></a>
                            <span className="fs-3 text-white fw-bold">UNITY.KG</span>
                            <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/chat">Баарлашуу</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/list">Каттоо тизме</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/about-us">Биз жөнүндө</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/content">Сүрөт/видео</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/profile">Жеке кабинет</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active" href="#" onClick={LogOut}>Профилден чыгуу</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default Header;
