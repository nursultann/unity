import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../global_variables/variables";
import { message } from "antd";

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
    const deleteVideo = async (value) =>{
        const data = await axios({
            method: 'delete',
            url: url + 'videos',
            params:{
                'id':value
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
        form.append('photo',photo[0]);
        if(photo != null){
        const data = await axios({
            method: 'post',
            url: url + 'photos',
            data: form,
            headers:'Content-type:multipart/form-data',
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
    const deletePhoto = async (value,name) =>{
        console.log('name',name);
        const data = await axios({
            method: 'delete',
            url: url + 'photos',
            params:{
                'id':value,
                'name':name,
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
    return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 bg-inf text-white">
                        <h3>Admin Panel</h3>
                    </div>
                </div>
                <div className="row mt-4 mb-5">
                    <div className="col-2">
                        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Список</button>
                            <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Добавить видео/фото</button>
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
                                                        <i class="fa-solid fa-check text-success"></i>
                                                        :
                                                        <i class="fa-solid fa-xmark text-danger"></i>
                                                        }
                                                    </td>
                                                    <td>
                                                        <i class="fa-regular fa-pen-to-square"></i>
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
                                            <input type="file" className="form-control" onChange={(e)=>setPhoto(e.target.files)} />
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
                                                        <a href="#" className="text-secondary" onClick={()=>deleteVideo(i.id)}>
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
                                                        <img src={url+'images/'+i.photo_name} alt="" width={'100%'} />
                                                        <a href="#" className="text-secondary" onClick={()=>deletePhoto(i.id,i.photo_name)}>
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
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default AdminConsole;