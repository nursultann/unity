import React, { useEffect, useState } from 'react';
import { message} from 'antd';
import Header from '../components/header';
import axios from 'axios';
import { url } from '../global_variables/variables';
const Edit = () => {
    const [name,setName] = useState();
    const [lastName,setLastName] = useState();
    const [middleName,setMiddleName] = useState();
    const [uid,setUid] = useState(localStorage.getItem('token'));
    const [inn,setInn] = useState();
    const [passport,setPassport] = useState();
    const [address,setAddress] = useState();
    const [email,setEmail] = useState();
    const [avatar,setAvatar] = useState();
    const [balance,setBalance] = useState();
    const [pass_date_issue,setPassIssue] = useState();
    const [pass_expiry_date,setPassExpiry] = useState();
    const [pass_photo,setPassPhoto] = useState();
    const [pass_photo_back, setPassPhotoBack] = useState();
    const [birthday,setBirthday] = useState();
    const [user,setUser] = useState(null);
    const [main,setMain] = useState(null);
    const [service,setService] = useState(null);
    const getUserDetails = async ()=>{
        const data = await axios({
            method:'get',
            url: url+'user-details',
            params:{'uid':uid}
        })
        console.log('user',user);
        if(data.data.status == 200){
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
    const postDetails = async ()=>{
        let final = 1;
        if(balance <= 1000000){
        if(name == null){
            final = 0;
            message.error('Поле имя не заполнено!',5);
        }
        else if(lastName == null){
            final = 0;
            message.error('Поле фамилия не заполнено!',5);
        }
        else if(inn == null){
            final = 0;
            message.error('Поле ИНН не заполнено!',5);
        }
        else if(passport == null){
            final = 0;
            message.error('Поле паспорт не заполнено!',5);
        }
        else if(avatar == null){
            final = 0;
            message.error('Поле аватар не заполнено!',5);
        }
        else if(address == null){
            final = 0;
            message.error('Поле адрес не заполнено!',5);
        }
        else if(email == null){
            final = 0;
            message.error('Поле email не заполнено!',5);
        }
        else if(birthday == null){
            final = 0;
            message.error('Поле дата рождения не заполнено!',5);
        }
        else if(pass_date_issue == null){
            final = 0;
            message.error('Поле дата выдачи паспорта не заполнено!',5);
        }
        else if(pass_expiry_date == null){
            final = 0;
            message.error('Поле срок действия паспорта не заполнено!',5);
        }
        else if(pass_photo == null){
            final = 0;
            message.error('Поле фото паспорта спереди не заполнено!',5);
        }
        else if(pass_photo_back == null){
            final = 0;
            message.error('Поле фото паспорта с обратной стороны не заполнено!',5);
        }
        else if(final == 1){
        const form = new FormData();
        form.append('name',name);
        form.append('lastname',lastName);
        if(middleName != ""){
        form.append('middlename',middleName);
        }else{
        form.append('middlename',null);
        }
        form.append('uid',uid);
        form.append('inn',inn);
        form.append('passport',passport);
        form.append('address',address);
        form.append('email',email);
        form.append('avatar',avatar);
        form.append('pass_date_issue',pass_date_issue);
        form.append('pass_expiry_date',pass_expiry_date);
        form.append('pass_photo',pass_photo);
        form.append('pass_photo_back', pass_photo_back);
        form.append('birthday',birthday);
        form.append('balance',balance);
        const data = await axios({
            method : 'post',
            data:form,
            url:url+'user-details',
            headers:'Content-type:multipart/form-data',
        });
        console.log('data post', data);
        updateBalance(main,service);
        if(data.data.status == 200){
            
            message.success('Данные сохранены!',5);
        }else{
            message.warning('Что-то пошло не так :(',5);
        }
    }else{
        message.warning('Что-то пошло не так!', 5);
    }
    }else{
        message.warning('Максимальное значение вперед до 1 000 000',5); 
            
        }
    }
    const getBalance = async () =>{
        const data = await axios({
            method:'get',
            url:url+'balance-update'
        })
        console.log('balance', data);
        if(data.data.status == 200){
            setMain(data.data.balance[0].main_sum);
            setService(data.data.balance[0].service_painment);
        }

    }
    const updateBalance = async (main,service)=>{
        const data = await axios({
            method:'update',
            url:url+'balance-update',
            params:{
                main:20000+parseInt(main),
                service:2000+parseInt(service)
            }
        })
        console.log('balance 1',data);
    }
    useEffect(()=>{
        getUserDetails();
        getBalance();
    },[])
    return (
        <>
        <Header/>
            {user != null ?
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <input className='form-control' type="file" name="" id="" onChange={(e)=>setAvatar(e.target.files[0])} />
                        <p><span className='text-danger'>*</span>Загрузите ваше фото</p>
                    </div>
                    <div className="col-8">
                        <div className="row">
                             <div className="col-12">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia natus alias, debitis temporibus commodi earum vel nam iure iusto, praesentium reprehenderit. Sapiente maxime magni non excepturi at sint, debitis aliquid.
                             </div>
                             <div className="col-12">
                                <label className='mt-2'><span className='text-danger'>*</span>Имя</label>
                                <input defaultValue={user.name != 'undefined' ? user.name : ''} onChange={(e)=>setName(e.target.value)} type="text" className='form-control' placeholder='Имя' />
                                <label className='mt-2'><span className='text-danger'>*</span>Фамилия</label>
                                <input defaultValue={user.lastname != 'undefined' ? user.lastName : ''} onChange={(e)=>setLastName(e.target.value)} type="text" className='form-control' placeholder='Фамилия' />
                                <label className='mt-2'>Отчество <span className='text-warning'>!</span> Если нет отчества то оставьте поле пустым</label>
                                <input defaultValue={user.middlename != 'null' ? user.middlename : ""} onChange={(e)=>setMiddleName(e.target.value)} type="text" className='form-control' placeholder='Отчество' />
                                <label className='mt-2'><span className='text-danger'>*</span>Дата рождения</label>
                                <input defaultValue={user.birthday} onChange={(e)=>setBirthday(e.target.value)} type="date" className='form-control' placeholder='Дата рождения' />
                                <label className='mt-2'><span className='text-danger'>*</span>Номер паспорта</label>
                                <input defaultValue={user.passport != 'undefined' ? user.passport : ''} onChange={(e)=>setPassport(e.target.value)} type="text" className='form-control' placeholder='Номер паспорта' disabled />
                                <label className='mt-2'><span className='text-danger'>*</span>ИНН</label>
                                <input defaultValue={user.inn != 'undefined' ? user.inn : ''} onChange={(e)=>setInn(e.target.value)} type="text" className='form-control' placeholder='ИНН' />
                                <label className='mt-2'><span className='text-danger'>*</span>Адрес проживания</label>
                                <input defaultValue={user.address != 'undefined' ? user.address : ''} onChange={(e)=>setAddress(e.target.value)} type="text" className='form-control' placeholder='Адрес проживания' />
                                {/* <input onChange={(e)=>setPhone(e.target.value)} type="number" className='form-control mt-3' placeholder='Тел номер' /> */}
                                <label className='mt-2'><span className='text-danger'>*</span>Почта e-mail</label>
                                <input defaultValue={user.email != 'undefined' ? user.email : ''} onChange={(e)=>setEmail(e.target.value)} type="email" className='form-control' placeholder='Электронная почта email' />
                             </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                        <div className="col-12 mb-3">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo dignissimos dolorum veniam iste voluptas ex reprehenderit sunt a. Delectus deleniti repellat consequatur ipsum totam praesentium maiores natus facilis consequuntur ullam!
                        </div>
                        <div className="col-6">
                        <label className='mt-2'><span className='text-danger'>*</span>Фото паспорта с передней стороны</label>
                        <input className='form-control' type="file" name="" id="" onChange={(e)=>setPassPhoto(e.target.files[0])} />
                        <label className='mt-2'><span className='text-danger'>*</span>Дата выдачи паспорта</label>
                        <input type="date" name="" id="" className='form-control' onChange={(e)=>setPassIssue(e.target.value)} />
                        </div>
                        <div className="col-6">
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
                        <label className='mt-2'><span className='text-danger'>*</span>Фото паспорта с обратной стороны</label>
                        <input className='form-control' type="file" name="" id="" onChange={(e)=>setPassPhotoBack(e.target.files[0])} />
                        <label className='mt-2'><span className='text-danger'>*</span>Срок действия</label>
                        <input type="date" name="" id="" className='form-control' onChange={(e)=>setPassExpiry(e.target.value)}/>
                        </div>
                        <div className="col-6 py-3">
                            <b>Плата за обслуживание</b> 
                            <br />
                            <span className='bg-secondary-subtle p-1 rounded mb-3'>2000</span>
                            <br />
                            <b>Основные суммы</b>
                            <br />
                            <span className='bg-secondary-subtle p-1 rounded'>20000</span>
                            <br />
                            <label htmlFor="" className='text-dark mt-3'><b>Вперед сумма</b></label>
                            <input defaultValue={user.balance > 0 ? user.balance : 0} type="text" className='form-control' onChange={(e)=>{setBalance(e.target.value)}} />
                        </div>
                        <div className="col-12 mt-3">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus non accusantium ex, sint dolores, consequuntur quis, porro hic libero voluptas sed dolorum quam blanditiis! Doloribus voluptates et ab nobis laborum.
                        </div>
                        <div className="col-12 mt-3">
                            <div className="row">
                                <div className="col-4">
                                    <input type="date" name="" id="" className='form-control' />
                                </div>
                                <div className="col-4">
                                    <b>Скачать договор</b><br />
                                    <a href="javascript:(print());" className='btn btn-outline-secondary'>Печать</a>
                                </div>
                                <div className="col-4">
                                    <button className='btn btn-warning' onClick={postDetails}>Сохранить</button>
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