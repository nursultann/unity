import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../global_variables/variables";
import { message } from "antd";
import { Button, Modal } from 'antd';
const AdminConsole = () => {
    const [user, setUser] = useState();
    const [table, setTable] = useState(null);
    const [video, setVideo] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [videos, setVideos] = useState(null);
    const [photos, setPhotos] = useState(null);
    const local = localStorage.getItem('adminToken');
    if (local == null) {
        window.location.href = '/admin';
    }
    const fetchUsers = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'table-users',
        })
        console.log('table data', data);
        if (data.data.status == 200) {
            setTable(data.data.users);
        }
    }
    useEffect(() => {
        fetchUsers();
        getVideos();
        getPhotos();
    }, []);
    //video
    const postVideo = async () => {
        const data = await axios({
            method: 'post',
            url: url + 'videos',
            params: {
                'url': video
            }
        });
        if (data.data.status == 200) {
            message.success('Успешно опубликовано видео!');
            getVideos();
        } else {
            message.error('Не получилось опубликовать видео!');
        }
    }
    const getVideos = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'videos',
        });
        if (data.data.status == 200) {
            setVideos(data.data.videos);
        } else {
            setVideos(null);
        }
    }
    const deleteVideo = async (value) => {
        const data = await axios({
            method: 'delete',
            url: url + 'videos',
            params: {
                'id': value
            }
        });
        if (data.data.status == 200) {
            message.success('Успешно видео удалено!');
            getVideos();
        } else {
            message.error('Не удалось удалить видео!');
        }
    }
    //photo
    const postPhoto = async () => {
        const form = new FormData();
        form.append('photo', photo[0]);
        if (photo != null) {
            const data = await axios({
                method: 'post',
                url: url + 'photos',
                data: form,
                headers: 'Content-type:multipart/form-data',
            });
            console.log('post photo', data);
            if (data.data.status == 200) {
                message.success('Успешно опубликовано фото!');
                getPhotos();
            } else {
                message.error('Не получилось опубликовать фото!');
            }
        }
    }
    const getPhotos = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'photos',
        });
        if (data.data.status == 200) {
            setPhotos(data.data.photos);
        } else {
            setPhotos(null);
        }
    }
    const deletePhoto = async (value, name) => {
        console.log('name', name);
        const data = await axios({
            method: 'delete',
            url: url + 'photos',
            params: {
                'id': value,
                'name': name,
            }
        });
        console.log('delete photo', data);
        if (data.data.status == 200) {
            message.success('Успешно фото удалено!');
            getPhotos();
        } else {
            message.error('Не удалось удалить фото!');
        }
    }
    //
    const getTableDetails = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'balance-update',
        })
        console.log('table data', data);
        if (data.data.status == 200) {
            setMainSum(data.data.balance[0].main_sum);
            setServicePainment(data.data.balance[0].service_painment);
        } else {
            setMainSum(null);
            setServicePainment(null);
        }
    }
    useEffect(() => {
        getTableDetails();
        getReports();
        getPainmentReports();
    }, [])
    //user report
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [balance, setBalance] = useState(null);
    const [name, setName] = useState(null);
    const [lastname, setLastName] = useState(null);
    const [mainSum, setMainSum] = useState(null);
    const [servicePainment, setServicePainment] = useState(null);
    const [passport, setPassport] = useState(null);
    const [city, setCity] = useState(null);
    const [street, setStreet] = useState(null);
    const [region, setRegion] = useState(null);
    const [passportTeh, setPassportTeh] = useState(null);
    const [code, setCode] = useState(null);
    const [id, setId] = useState(null);
    //modal1
    const showModal = (balance, lastname, name, passport, id) => {
        setLastName(lastname);
        setBalance(balance);
        setName(name);
        setPassport(passport);
        setId(id)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //modal2
    const showModal1 = (balance, lastname, name, passport, id) => {
        setLastName(lastname);
        setBalance(balance);
        setName(name);
        setPassport(passport);
        setId(id)
        setIsModalOpen1(true);
    };
    const handleOk1 = () => {
        setIsModalOpen1(false);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };
    //painment report of users
    const [painment1, setPainment1] = useState(null);
    const [monthSum, setMonthSum] = useState(null);
    const getPainmentReports1 = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'report-painments'
        });
        if (data.data.status == 200) {
            setPainment1(data.data.report_painments);
        } else {
            setPainment1(null);
        }
    }
    const postReport1 = async () => {
        const params = {
            'name': name,
            'lastname': lastname,
            'sum': monthSum,
        }
        const data = await axios({
            method: 'post',
            url: url + 'report-painments',
            params: params
        });
        console.log('report painments', data);
        if (data.data.status == 200) {
            changeMainBalance1();
        } else {
            message.warning('Заполните все поля!');
        }
    }
    const changeMainBalance1 = async () => {
        const params = {
            'main_sum':parseFloat(mainSum)+parseFloat(monthSum)
        }
        const data = await axios({
            method: 'update',
            url: url + 'report-painments',
            params:params
        });
        console.log('params changeMainBalanceAdd',params);
        console.log('changeMainBalanceAdd', data);
        if (data.data.status == 200) {
            message.success('Успешно!');
        } else {
            message.error('Что-то пошло не так!');
        }
    }
    useEffect(()=>{
        getPainmentReports1();
    },[])
    //painment report
    const [painment, setPainment] = useState(null);
    const getPainmentReports = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'report-painment'
        });
        if (data.data.status == 200) {
            setPainment(data.data.report_painment);
        } else {
            setPainment(null);
        }
    }
    const postReport = async () => {
        const params = {
            'name': name,
            'lastname': lastname,
            'passport': passport,
            'balance': balance,
            'main_sum': mainSum,
            'city': city,
            'region': region,
            'street': street,
            'passport_teh': passportTeh,
            'code': code,
            'id':id
        }
        const data = await axios({
            method: 'post',
            url: url + 'report-painment',
            params: params
        });
        console.log('report painment', data);
        if (data.data.status == 200) {
            changeStatus(id);
        } else {
            message.warning('Заполните все поля!');
        }
    }
    const changeStatus = async (id) => {
        const data = await axios({
            method: 'delete',
            url: url + 'report-painment',
            params: {
                id: id
            }
        });
        if (data.data.status == 200) {
            changeMainBalance();
        } else {
            message.warning('Что-то пошло не так!');
        }
    }
    const changeMainBalance = async (id) => {
        const data = await axios({
            method: 'update',
            url: url + 'report-painment',
        });
        if (data.data.status == 200) {
            message.success('Успешно!');
        } else {
            message.error('Что-то пошло не так!');
        }
    }
    //report service painment
    const [reports, setReports] = useState(null);
    const getReports = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'report'
        });
        if (data.data.status == 200) {
            setReports(data.data.report);
        } else {
            setReports(null);
        }
    }
    const serviceReport = async () => {
        const data = await axios({
            method: 'post',
            url: url + 'report',
            params: {
                service: servicePainment
            }
        });
        if (data.data.status == 200) {
            UpdateServicePainment();
            getReports();
        } else {
            message.warning('Что-то пошло не так :(');
        }
    }
    const UpdateServicePainment = async () => {
        const data = await axios({
            method: 'update',
            url: url + 'report'
        })
        if (data.data.status == 200) {
            message.success('Отчет по обслуживанию сделан!');
        } else {
            message.error('Не удалось сделать отчет!');
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 bg-inf text-white">
                    <h3>Admin Panel</h3>
                    <a className="text-white" href="/list">На сайт</a>
                </div>
            </div>
            <div className="row mt-4 mb-5">
                <div className="col-2">
                    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Список</button>
                        <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Добавить видео/фото</button>
                        <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Контроль</button>
                        <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Отчет по пользователям</button>
                        <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-setting" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Отчет по ежемесячным платежам</button>
                    </div>
                </div>
                <div className="col-10">
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
                            <table className="list">
                                {table != null ?
                                    <>
                                        {table.map((item) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.lastname + ' ' + item.name + ' ' + (item.middname != undefined ? item.middname : '')}</td>
                                                <td>2000</td>
                                                <td>20000</td>
                                                <td>{item.balance}</td>
                                                <td>
                                                    {item.status == 1 ?
                                                        <i class="fa-solid fa-check text-success" ></i>
                                                        :
                                                        <i class="fa-solid fa-xmark text-danger"></i>
                                                    }
                                                </td>
                                                <td>
                                                    <i class="fa-regular fa-pen-to-square"
                                                        onClick={() => showModal(item.balance, item.lastname, item.name, item.passport, item.id)}></i>
                                                </td>
                                            </tr>
                                        )
                                        }

                                    </>
                                    :
                                    <>

                                    </>
                                }
                            </table>
                        </div>
                        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                            <div className="col-12">
                                <h4>Добавить видео</h4>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="text" className="form-control" placeholder="добавьте url" onChange={(e) => setVideo(e.target.value)} />
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-info" onClick={postVideo}>
                                            Добавить видео
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <h4>Добавить фото</h4>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files)} />
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-info" onClick={postPhoto}>
                                            Добавить фото
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <h4>Добавленные видео</h4>
                                <hr />
                                <div className="row">
                                    {videos != null ?
                                        <>
                                            {videos.map((i) =>
                                                <div className="col-4 text-end">
                                                    <iframe width="100%" height="350" src={"https://www.youtube.com/embed/" + i.url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                                    <a href="#" className="text-secondary" onClick={() => deleteVideo(i.id)}>
                                                        <i class="fa-solid fa-trash-can"></i> удалить видео
                                                    </a>
                                                </div>
                                            )
                                            }

                                        </>
                                        :
                                        <>
                                            <p className="text-center">Нет видео</p>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <h4>Добавленные фото</h4>
                                <hr />
                                <div className="row">
                                    {photos != null ?
                                        <>
                                            {photos.map((i) =>
                                                <div className="col-4 text-end">
                                                    <img src={url + 'images/' + i.photo_name} alt="" width={'100%'} />
                                                    <a href="#" className="text-secondary" onClick={() => deletePhoto(i.id, i.photo_name)}>
                                                        <i class="fa-solid fa-trash-can"></i> удалить фото
                                                    </a>
                                                </div>
                                            )
                                            }
                                        </>
                                        :
                                        <>
                                            <p className="text-center">Нет фоток</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">
                            <table className="list">
                                {reports != null ?
                                    <>
                                        <tr>
                                            <td>№</td>
                                            <td>Дата</td>
                                            <td>Плата за обслуживание</td>
                                            <td>Налог 3%</td>
                                            <td>Налог 3%</td>
                                            <td>Доброта 10%</td>
                                        </tr>
                                        {reports.map((item) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.date_of_report}</td>
                                                <td>{item.service_painment}</td>
                                                <td>{((item.service_painment) * 3) / 100}</td>
                                                <td>{((item.service_painment) * 3) / 100}</td>
                                                <td>{((item.service_painment) * 10) / 100}</td>
                                            </tr>
                                        )
                                        }

                                    </>
                                    :
                                    <>
                                        <p className="text-center text-secondary p-3"> Нет отчетов по обслуживанию</p>
                                    </>
                                }
                            </table>
                            <p>Баланс обслуживания : {servicePainment != null ? servicePainment : <></>}</p>
                            <button className="btn btn-info" onClick={serviceReport}>Сделать отчет</button>
                        </div>
                        <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabindex="0">
                            <table className="list">
                                {painment != null ?
                                    <>
                                        {painment.map((item) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.lastname + ' ' + item.name}</td>
                                                <td>2000</td>
                                                <td>20000</td>
                                                <td>{item.balance}</td>
                                                <td>

                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        )
                                        }

                                    </>
                                    :
                                    <>

                                    </>
                                }
                            </table>
                        </div>
                        <div class="tab-pane fade" id="v-pills-setting" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">
                            <table className="list">
                                {painment1 != null ?
                                    <>
                                        {painment1.map((item) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.lastname + ' ' + item.name + ' ' + (item.middname != undefined ? item.middname : '')}</td>
                                                <td>{item.sum}</td>
                                                <td>{item.date_of_amount}</td>
                                            </tr>
                                        )
                                        }

                                    </>
                                    :
                                    <>

                                    </>
                                }
                            </table>
                            <button className="btn btn-info mt-3" onClick={showModal1}>Добавить платеж</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Добавить в отчет" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <div className="col-12 p-4">
                    <h6 className="text-center">Адрес</h6>
                    <input type="text" className="form-control mb-2" placeholder="Область" onChange={(e) => setRegion(e.target.value)} />
                    <input type="text" className="form-control mb-2" placeholder="Город" onChange={(e) => setCity(e.target.value)} />
                    <input type="text" className="form-control mb-2" placeholder="Улица" onChange={(e) => setStreet(e.target.value)} />
                    <input type="text" className="form-control mb-2" placeholder="Номер тех паспорта" onChange={(e) => setPassportTeh(e.target.value)} />
                    <input type="text" className="form-control mb-2" placeholder="Код из компании" onChange={(e) => setCode(e.target.value)} />
                    <div className="col-12">
                        <p>Цена</p>
                        <div className="col-12 border">
                            <h4 className="text-danger text-center">{mainSum != null ? mainSum : <></>}</h4>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <button className="btn btn-warning mt-2 text-white" onClick={postReport}>
                            Переместить
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal title="Добавить платеж" open={isModalOpen1} footer={null} onOk={handleOk1} onCancel={handleCancel1}>
                <div className="col-12 p-4">
                    <h6 className="text-center">Добавить платеж</h6>
                    <input type="text" className="form-control mb-2" placeholder="Имя" onChange={(e) => setName(e.target.value)} />
                    <input type="text" className="form-control mb-2" placeholder="Фамилия" onChange={(e) => setLastName(e.target.value)} />
                    <input type="number" className="form-control mb-2" placeholder="Сумма платежа" onChange={(e) => setMonthSum(e.target.value)} />
                    <div className="col-12 d-flex justify-content-center">
                        <button className="btn btn-warning mt-2 text-white" onClick={postReport1}>
                            Совершить платеж
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default AdminConsole;