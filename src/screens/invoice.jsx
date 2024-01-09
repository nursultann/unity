import axios from 'axios';
import logo from '../img/Лого русский вариант.png';
import back from '../img/фон юнити.jpg';
import { useEffect, useState } from 'react';
import { url } from '../global_variables/variables';
import { Preview, print } from 'react-html2pdf';
const Invoice = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState();
    const [balance, setBalance] = useState();
    const local = localStorage.getItem('token');
    const [userDetails, setUserDetails] = useState(null);
    const checkLogged = async () => {
        if (local == null) {
            setUserDetails(null);
        } else {
            const data = await axios({
                url: url + 'user-details',
                method: 'get',
                params: {
                    uid: local,
                }
            });
            console.log('local', data);
            if (data.data.status == 200) {
                setUserDetails(data.data.user[0]);
                setImageUrl(data.data.user[0].avatar);
                setBalance(data.data.user[0].balance);
                setEmail(data.data.user[0].email);
                setPhone(data.data.user[0].phone);
            }
        }
    }
    useEffect(() => {
        checkLogged();
        console.log('token', local);
    }, []);
    return (
        <div className='p-3'>
            <Preview id={'jsx-template'} >
                <div className="col-12 p-5 border border-danger" style={{ backgroundImage: 'url(' + back + ')', backgroundSize: 'cover' }}>
                    <div className="col-12 text-start mb-4">
                        Кыргыз Республикасынын жарандарын ыктыярдуу бирикмесинин негизинде турак жайлуу болуусун жеңил жол менен уюштуруучу
                        коммерциялык эмес системалуу кооперативтик компания <br />
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <div className="col-3">
                            <img src={logo} alt="" width={'100%'} />
                            <h4 className='text-center mt-4'>КҮБӨЛҮК</h4>
                        </div>
                    </div>
                    <div className="col-12 mt-2 d-flex justify-content-center">
                        <div className="col-4 text-center">
                            <h5>Текшерүү номери (бул номер документтин номери болуп эсептелет)</h5>
                            <input type="text" className='form-control' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-5">
                            {userDetails != null ?
                                <>
                                    <p>Аты: {userDetails.name}</p>
                                    <p>Фамилиясы: {userDetails.lastname}</p>
                                    <p>Колдонуучунун ID : {userDetails.id}</p>
                                    <p>Жашаган дареги: {userDetails.address}</p>
                                    <p>Каттоо болгон куну {userDetails.date_registr}</p>
                                </>
                                :
                                <>
                                </>
                            }
                        </div>
                        <div className="col-6 mt-5">
                            <p>Эки тараптуу данный
                                (биринчи тарапка клиенттердин данныйы экинчи тарапка ЮНИТИ компаниясынын башкы президенти И. Танаев)
                            </p>
                            <br />
                            <br />
                            <br />
                            _________________________ <br />
                            печать кол
                        </div>
                    </div>
                </div>
            </Preview>
            <div className="col-12">
                <p><b>Сохраняем файл договора, прежде чем перейти на главную страницу</b></p>
                Скачать договор<br />
                <a href="#" onClick={() => print('a', 'jsx-template')} className='btn btn-outline-warning'>Скачать договор</a>
                <a href="/list" className='btn btn-outline-secondary ms-2'>Перейти на главную</a>
            </div>
        </div>
    )
}
export default Invoice;