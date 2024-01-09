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
            message.success('Текшерүү код туура!', 10);
            setUid(result.user.uid);
            setState(true);
            // result.user.uuid;
            console.log('success ', result);
        }).catch((err) => {
            message.error('Текшерүү код туура эмес!', 10);
        })
    }
    const ValidParams = () => {
        if (phone != null && password != null) {
            RegisterUser(phone, password, name, lastName, passport, email);
        } else {
            message.warning('Баардык тааларды толтуруңуз!', 2000);
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
            message.warning('Бирдеке туура эмес кетти, кайталап көрүңүз! :)', 2000);
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
                    <img src={RegLogo} alt="" width={200} />
                </div>
                <div className="col-12 px-5 mt-4" style={{fontSize : '12pt'}}>
                    <div className="col-12 text-center"> “UNITY” платформага кош келиңиз!</div> 
                        <br />
                    - Бул компания 2023-жылдын ___  Мамлекеттик тийиштүү каттоодон өтүп, өз ишмердүүлүгүн бир гана турак жай менен чектеген платформа.
                        <br />
                    - Бул платформа Кыргыз Республикасынын жарандарын ыктыярдуу бирикмесинин негизинде турак жайлуу болуусун жеңил жол менен уюштуруучу комерциялык эмес системалуу кооперативтик компания.
                        <br />
                    - Платформага көпчүлүк адамдардын бир жолку төлөмүнүн негизинде бир канча талаптарга ылайык, биринчи кезекте турган адамдын каржылык абалына жараша турак жай менен камсыз кылуу системасы киргизилген.
                        <br />
                    - Платформадагы кезек адамдын каржылык абалына көз каранды. Канчалык каражатыңызды көп белгилесеңиз ошончолук кезек алдыда.
                        <br />
                    - Бул веб сайтты колдонуп өзүңүздүн жана башкалардын турак жай үчүн бир жолку төлөнгөн каражаты кантип каяка жумшалып жатканын көзөмөлгө алуу мүмкүнчүлүгү камтылганын байкайсыз. Ошол менен бирге жеке адам каттоодон өттүшү менен качан жана кантип кандай каражат менен турак жайлуу болорун аныктай алат.
                        <br />
                    - Платформа негизинен жарандардын турак жай муктаждыктарын колгоо алуу коомдун турак жайга болгон тең салмактуулугун сактоо максатта түзүлдү. Биздин принцип Кыргыз Республикасынын жарандары Кыргыз Республикасынын аймагында турак жайсыз болбошу керек дегенге максималдуу форма түзүү.
                        <br />
                    - Бул платформа аркылуу эч бир турак жайга ээлик кылбаган Кыргыз Республикасынын жарандары гана турак жайга болгон талаптардын жана чектөөлөрдүн негизинде үйлүү болууга каттоого тура алышат.
                        <br />
                    - Каттоого турган күндөн тартып сиз веп сайт аркылуу онлайн каржылык абалыңызды эске алып кезегиңизди алдыга жылдыруу менен башкара аласыз.
                        <br />
                    - Компаниянын жалпы кирешеси жана алып берүүчү турак жай 100% кезеке турган адамдардын акчасы менен каржыланат.
                        <br />
                    - Негизинен кооперативдер коммерциялык жана коммерциялык эмес болуп 2 түргө бөлүнөт. 1) Коммерциялык кооперативдерге пайда табууну көздөгөн (ЖККР 82-берене, пункт-1) өндүрүш жана тейлөө кооперативдери кирет. Мисалы айыл-чарба кооперативдери, финансы кооперативдери ж.б. Ал эми коммерциялык эмес кооперативдер-пайда табууну көздөбөгөн жана алынган пайданы катышуучулардын ортосунда бөлүштүрбөгөн (ЖККР 82-берене, пункт-1), өздөрүнүн уставындагы максаттарга зарыл болгон өлчөмдө гана ишкердик кылган кооперативдер кирет. Коммерциялык эмес кооперативдерди жалпы жонунан керектөөчүлөрдүн кооперативи деп аташат.
                        <br />
                    - Биздин платформанын ишмердүүлүгү менен толук таанышуу үчүн каттоодон (ссылка каттоо) өтүңүз.
                </div>
            </div>
            {state ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center" style={{ marginTop: "100px" }}>
                            <div className="col-6 text-center bg-inf text-white p-3 px-5">
                                <h1 className="text-center">КАТТОО</h1>
                                <input type="text" placeholder="Аты" className="form-control mt-4" onChange={(e) => setName(e.target.value)} />
                                <input type="text" placeholder="Фамилиясы" className="form-control mt-4" onChange={(e) => setLastName(e.target.value)} />
                                <input type="text" placeholder="КР паспорт номериңиз" className="form-control mt-4" onChange={(e) => setPassport(e.target.value)} />
                                <input type="email" placeholder="E-mail" className="form-control mt-4" onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder="Сыр сөз" className="form-control mt-4" onChange={(e) => setPassword(e.target.value)} />
                                <input type="password" placeholder="Сыр сөздү кайталаңыз" className="form-control mt-4" />
                                <br />
                                <a href="#" className="btn btn-primary mt-3" onClick={ValidParams}>каттоо</a>
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
                                        <h1 className="text-center">Телефон номериниз</h1>
                                        <input type="number" placeholder="Номер телефона без +" className="form-control mt-4" onChange={(e) => setPhone(e.target.value)} />
                                        <br />
                                        <input type="checkbox" name="" id="" /> Макулдашылган шарттарды кабыл алам <br />
                                        <div className="my-3 ml-xl-5" id="recaptcha-container"></div><br />
                                        <a href="#" className="btn btn-primary mt-3" onClick={checkPhone}>Текшерүү кодун алуу</a>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-5 text-center bg-inf text-white p-3 px-5">
                                        <h1 className="text-center">Текшерүү кодун ырастоо</h1>
                                        <input type="number" placeholder="Код подтверждения" defaultValue='' className="form-control mt-4" onChange={(e) => setCode(e.target.value)} />
                                        <br />
                                        <a href="#" className="btn btn-primary mt-3" onClick={ValidOtp}>Текшерүү кодун ырастоо</a>
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