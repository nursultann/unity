import React, { useEffect, useState } from 'react';
import { message, Upload } from 'antd';
import Header from '../components/header';
import axios from 'axios';
import { url } from '../global_variables/variables';

const Profile = () => {
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
        console.log('token',local);
    }, []);
    const onChangePhoto = async ()=>{
        console.log('imageUrl', imageUrl);
        console.log('avatar', avatar);
        const form = new FormData();
            form.append('avatar', avatar);
            form.append('oldAvatar', imageUrl);
            form.append('id', parseInt(userDetails.id));
        const data = await axios({
            method : 'post',
            url : url+'update-avatar',
            data : form,
            headers:'Content-type:multipart/form-data',
        });
        console.log('avatar',data);
        if (data.data.status == 200) {
            message.success('Фото изменено!', 5);
        } else {
            message.error('Не удалось изменить фото!', 5);
        }
    }
    const saveData = async () => {
        const params = {
            balance:balance,
            id:parseInt(userDetails.id),
            email:email,
            phone:phone
        }
        console.log('params',params);
        if (phone != null && email != null && balance != null) {
            // const form = new FormData();
            // if (avatar == null) {
            //     form.append('avatar', null);
            //     form.append('oldAvatar', null);
            // } else {
            //     form.append('avatar', avatar);
            //     form.append('oldAvatar', imageUrl);
            // }
            // form.append('phone', phone);
            // form.append('email', email);
            // form.append('balance', balance);
            // form.append('id', parseInt(userDetails.id));
            const data = await axios({
                method: 'update',
                url: url + 'user-details',
                params: params,
            });
            console.log('save data', data);
            if (data.data.status == 200) {
                message.success('Данные сохранены!', 5);
            } else {
                message.error('Не удалось сохранить!', 5);
            }
        }else{
            console.log('error!');
        }
    }
    return (
        <>
            <Header />
            {userDetails != null ?
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 bg-inf p-3">
                            <h3 className='text-light'>{userDetails.name + ' ' + userDetails.lastname + ' ' + userDetails.middlename}</h3>
                        </div>
                        <div className="col-5 pt-5">
                            <input type="file" className='form-control' name="avatar" id="" onChange={(e)=>setAvatar(e.target.files[0])} />
                            <br />
                            <button className='btn btn-info text-white' onClick={onChangePhoto}>Изменить фото</button>
                            <br />
                            Ваш баланс <br />
                            <input defaultValue={userDetails.balance} type="text" className='form-control' onChange={(e)=>setBalance(e.target.value)} />
                            <br />
                            <button className='btn btn-info text-white' onClick={saveData}>Сохранить</button>
                        </div>
                        <div className="col-7">
                            <div className="row">
                                <div className="col-5 pt-5">
                                    <h3>{userDetails.birthday}</h3>
                                </div>
                                <div className="col-7 pt-5">
                                    <input defaultValue={userDetails.email} type="text" placeholder='почта' className='form-control' onChange={(e)=>setEmail(e.target.value)} /><br />
                                    <input defaultValue={userDetails.phone} type="text" placeholder='номер телефона' className='form-control' onChange={(e)=>setPhone(e.target.value)} /><br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='col-12 text-center'>
                    <p className='pt-5'>Нет ваших данных</p>
                    <a className='btn btn-info' href="/edit">Добавить данные в список</a>
                </div>
            }
        </>
    )
}
export default Profile;