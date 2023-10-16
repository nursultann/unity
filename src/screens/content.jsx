import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import axios from "axios";
import { url } from "../global_variables/variables";

const Info = () => {
    const [videos, setVideos] = useState(null);
    const [photos, setPhotos] = useState(null);
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
    useEffect(() => {
        getVideos();
        getPhotos();

    }, [])
    return (
        <>
            <Header />
            <div className="col-12">
                <div className="row">
                    <div className="col-2">
                        <div class="nav flex-column me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Видео</button>
                            <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Фото</button>
                        </div>
                    </div>
                    <div className="col-9">
                        <div class="tab-content" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
                                <div className="col-12">
                                    <h4>Последние видео</h4>
                                    <hr />
                                    <div className="row">
                                        {videos != null ?
                                            <>
                                                {videos.map((i) =>
                                                    <div className="col-4 text-end">
                                                        <iframe width="100%" height="350" src={"https://www.youtube.com/embed/" + i.url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
                            </div>
                            <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                                <div className="col-12">
                                    <h4>Последние фото</h4>
                                    <hr />
                                    <div className="row">
                                        {photos != null ?
                                            <>
                                                {photos.map((i) =>
                                                    <div className="col-4">
                                                        <img src={url + 'images/' + i.photo_name} alt="" width={'100%'} />
                                                    </div>
                                                )
                                                }

                                            </>
                                            :
                                            <>
                                                <p className="text-secondary text-center">
                                                    Нет фоток
                                                </p>

                                            </>

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Info;