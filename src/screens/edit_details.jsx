import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import Header from '../components/header';
import axios from 'axios';
import { url } from '../global_variables/variables';
const Edit = () => {
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [middleName, setMiddleName] = useState();
    const [uid, setUid] = useState(localStorage.getItem('token'));
    const [inn, setInn] = useState();
    const [passport, setPassport] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState();
    const [balance, setBalance] = useState();
    const [pass_date_issue, setPassIssue] = useState();
    const [pass_expiry_date, setPassExpiry] = useState();
    const [pass_photo, setPassPhoto] = useState();
    const [pass_photo_back, setPassPhotoBack] = useState();
    const [birthday, setBirthday] = useState();
    const [user, setUser] = useState(null);
    const [main, setMain] = useState(null);
    const [service, setService] = useState(null);
    const getUserDetails = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'user-details',
            params: { 'uid': uid }
        })
        console.log('user', user);
        if (data.data.status == 200) {
            setUser(data.data.user[0]);
            setName(data.data.user[0].name);
            setLastName(data.data.user[0].lastname);
            setAvatar(data.data.user[0].avatar);
            setBalance(data.data.user[0].balance);
            setBirthday(data.data.user[0].birthday);
            setEmail(data.data.user[0].email);
            setInn(data.data.user[0].inn);
            setPassport(data.data.user[0].passport);
            setMiddleName(data.data.user[0].middlename);
            setPassExpiry(data.data.user[0].pass_expiry_date);
            setPassIssue(data.data.user[0].pass_date_issue);
            setPassPhoto(data.data.user[0].pass_photo);
            setPassPhotoBack(data.data.user[0].pass_photo_back);
            setAddress(data.data.user[0].address);
        }
    }
    const postDetails = async () => {
        let final = 1;
        if (balance <= 1000000) {
            if (name == null) {
                final = 0;
                message.error('Поле имя не заполнено!', 5);
            }
            else if (lastName == null) {
                final = 0;
                message.error('Поле фамилия не заполнено!', 5);
            }
            else if (inn == null) {
                final = 0;
                message.error('Поле ИНН не заполнено!', 5);
            }
            else if (passport == null) {
                final = 0;
                message.error('Поле паспорт не заполнено!', 5);
            }
            else if (avatar == null) {
                final = 0;
                message.error('Поле аватар не заполнено!', 5);
            }
            else if (address == null) {
                final = 0;
                message.error('Поле адрес не заполнено!', 5);
            }
            else if (email == null) {
                final = 0;
                message.error('Поле email не заполнено!', 5);
            }
            else if (birthday == null) {
                final = 0;
                message.error('Поле дата рождения не заполнено!', 5);
            }
            else if (pass_date_issue == null) {
                final = 0;
                message.error('Поле дата выдачи паспорта не заполнено!', 5);
            }
            else if (pass_expiry_date == null) {
                final = 0;
                message.error('Поле срок действия паспорта не заполнено!', 5);
            }
            else if (pass_photo == null) {
                final = 0;
                message.error('Поле фото паспорта спереди не заполнено!', 5);
            }
            else if (pass_photo_back == null) {
                final = 0;
                message.error('Поле фото паспорта с обратной стороны не заполнено!', 5);
            }
            else if (final == 1) {
                const form = new FormData();
                form.append('name', name);
                form.append('lastname', lastName);
                if (middleName != "") {
                    form.append('middlename', middleName);
                } else {
                    form.append('middlename', null);
                }
                form.append('uid', uid);
                form.append('inn', inn);
                form.append('passport', passport);
                form.append('address', address);
                form.append('email', email);
                form.append('avatar', avatar);
                form.append('pass_date_issue', pass_date_issue);
                form.append('pass_expiry_date', pass_expiry_date);
                form.append('pass_photo', pass_photo);
                form.append('pass_photo_back', pass_photo_back);
                form.append('birthday', birthday);
                form.append('balance', balance);
                const data = await axios({
                    method: 'post',
                    data: form,
                    url: url + 'user-details',
                    headers: 'Content-type:multipart/form-data',
                });
                console.log('data post', data);
                updateBalance(main, service);
                if (data.data.status == 200) {
                    message.success('Сакталды!', 5);
                    window.location.href = '/invoice';
                } else {
                    message.warning('Сакталбай калды :(', 5);
                }
            } else {
                message.warning('Бирдеке туура эмес кетти!', 5);
            }
        } else {
            message.warning('Максималдуу сан 1 000 000 чейин', 5);

        }
    }
    const getBalance = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'balance-update'
        })
        console.log('balance', data);
        if (data.data.status == 200) {
            setMain(data.data.balance[0].main_sum);
            setService(data.data.balance[0].service_painment);
        }

    }
    const updateBalance = async (main, service) => {
        const data = await axios({
            method: 'update',
            url: url + 'balance-update',
            params: {
                main: 20000 + parseInt(main),
                service: 2000 + parseInt(service)
            }
        })
        console.log('balance 1', data);
    }
    useEffect(() => {
        getUserDetails();
        getBalance();
    }, [])
    return (
        <>
            <Header />
            {user != null ?
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 my-3 my-lg-0 pe-lg-5">
                            <input className='form-control' type="file" name="" id="" onChange={(e) => setAvatar(e.target.files[0])} />
                            <p><span className='text-danger'>*</span>Сүрөтүңүздү жүктөңүз</p>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <strong>Бул жерде сиз жеке маалыматыңызды толтурасыз</strong>
                                </div>
                                <div className="col-12">
                                    <label className='mt-2'><span className='text-danger'>*</span>Аты</label>
                                    <input defaultValue={user.name != 'undefined' ? user.name : ''} onChange={(e) => setName(e.target.value)} type="text" className='form-control' placeholder='Аты' />
                                    <label className='mt-2'><span className='text-danger'>*</span>Фамилиясы</label>
                                    <input defaultValue={user.lastname != 'undefined' ? user.lastname : ''} onChange={(e) => setLastName(e.target.value)} type="text" className='form-control' placeholder='Фамилиясы' />
                                    <label className='mt-2'>Атасынын аты <span className='text-warning'>!</span> Эгерде жок болсо анда талааны бош калтырыңыз</label>
                                    <input defaultValue={user.middlename != 'null' ? user.middlename : ""} onChange={(e) => setMiddleName(e.target.value)} type="text" className='form-control' placeholder='Атасынын аты' />
                                    <label className='mt-2'><span className='text-danger'>*</span>Туулган күнү</label>
                                    <input defaultValue={user.birthday} onChange={(e) => setBirthday(e.target.value)} type="date" className='form-control' placeholder='Туулган күнү' />
                                    <label className='mt-2'><span className='text-danger'>*</span>Паспорт номери (КР)</label>
                                    <input defaultValue={user.passport != 'undefined' ? user.passport : ''} onChange={(e) => setPassport(e.target.value)} type="text" className='form-control' placeholder='Номер паспорта' disabled />
                                    <label className='mt-2'><span className='text-danger'>*</span>ИНН</label>
                                    <input defaultValue={user.inn != 'undefined' ? user.inn : ''} onChange={(e) => setInn(e.target.value)} type="text" className='form-control' placeholder='ИНН' />
                                    <label className='mt-2'><span className='text-danger'>*</span>Жашаган дареги</label>
                                    <input defaultValue={user.address != 'undefined' ? user.address : ''} onChange={(e) => setAddress(e.target.value)} type="text" className='form-control' placeholder='Жашаган дареги' />
                                    {/* <input onChange={(e)=>setPhone(e.target.value)} type="number" className='form-control mt-3' placeholder='Тел номер' /> */}
                                    <label className='mt-2'><span className='text-danger'>*</span>Электрондук почта</label>
                                    <input defaultValue={user.email != 'undefined' ? user.email : ''} onChange={(e) => setEmail(e.target.value)} type="email" className='form-control' placeholder='Электрондук почта' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 my-3 text-center border border-dark-subtle">
                            <strong>Необходимо, чтобы данные, которые вы заполнили,<br />
                                соответствовали вашему паспорту
                            </strong>
                        </div>
                        <div className="col-lg-6">
                            <label className='mt-2'><span className='text-danger'>*</span>Паспорттун сүрөтү алдыңкы бет</label>
                            <input className='form-control' type="file" name="" id="" onChange={(e) => setPassPhoto(e.target.files[0])} />
                            <label className='mt-2'><span className='text-danger'>*</span>Берилген күнү</label>
                            <input defaultValue={user.pass_date_issue} type="date" name="" id="" className='form-control' onChange={(e) => setPassIssue(e.target.value)} />
                        </div>
                        <div className="col-lg-6">
                            {/* <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange3}
                        >
                            {pass_photo_back ? (
                                <img
                                    src={pass_photo_back}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                uploadButton3
                            )}
                        </Upload> */}
                            <label className='mt-2'><span className='text-danger'>*</span>Паспорттун сүрөтү арткы бет</label>
                            <input className='form-control' type="file" name="" id="" onChange={(e) => setPassPhotoBack(e.target.files[0])} />
                            <label className='mt-2'><span className='text-danger'>*</span>Жарактуу мөнөтү</label>
                            <input defaultValue={user.pass_expiry_date} type="date" name="" id="" className='form-control' onChange={(e) => setPassExpiry(e.target.value)} />
                        </div>
                        <div className="col-lg-6 py-3">
                            <b>Кызмат көрсөтүүгө болгон төлөм</b>
                            <br />
                            <span className='bg-secondary-subtle p-1 rounded mb-3'>2000</span>
                            <br />
                            <b>Негизги эсеп</b>
                            <br />
                            <span className='bg-secondary-subtle p-1 rounded'>20000</span>
                            <br />
                            <label htmlFor="" className='text-dark mt-3'><b>Кезегиңизди аныктоочу эсебиңиз</b> (Эң аз 1000 эң көп 1000000)</label>
                            <input defaultValue={user.balance > 0 ? user.balance : 0} type="text" className='form-control' onChange={(e) => { setBalance(e.target.value) }} />
                        </div>
                        <div className="col-12 mt-3 border border-dark-subtle">
                            <strong>
                                Маалыматыңызды толтургандан кийин, күбөлүк файлы пайда болот
                                төмөндө жүктөп алыңыз
                                <br />
                                <br />
                                Күбөлүктү мыйзамдуу күчүнө кириши үчүн тиешелүү төлөмдөрдү жүргүзүп биздин кеңседен келишим түзүңүз
                                Көрсөтүлгөн биздин дареке кайрылыңыз же онлайн байланышыңыз.

                            </strong>
                        </div>
                        <div className="col-12 mt-3 mb-5">
                            <div className="row">
                                <div className="col-lg-4">
                                    {/* <input type="date" name="" id="" className='form-control' /> */}
                                </div>
                                <div className="col-lg-4">

                                </div>
                                <div className="col-lg-4">
                                    <button className='btn btn-warning col-12' onClick={postDetails}>Сактоо</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>


                </>
            }
        </>
    )
}
export default Edit;