import axios from "axios";
import Footer from "../components/footer";
import Header from "../components/header";
import { message } from "antd";
import { useEffect, useState } from "react";
import { url } from "../global_variables/variables";
import moment from "moment/moment";
const Chat = () => {
    const local = localStorage.getItem('token');
    const [messages, setMessages] = useState([]);
    const [user_name, setUserName] = useState();
    const [userId,setUserId] = useState();
    const [value,setValue] = useState();
    const [userDetails, setUserDetails] = useState(null);
    const checkLogged = async () => {
        if (local == null) {
            setUserDetails(null);
            window.location.href = '/';
        } else {
            const data = await axios({
                url: url + 'user-details',
                method: 'get',
                params: {
                    uid: local,
                }
            });
            if (data.data.status == 200) {
                setUserDetails(data.data.user[0]);
                setUserId(data.data.user[0].id);
            }
            console.log('local', data);
        }

    }
    useEffect(() => {
        checkLogged();
    }, []);
    const getMessages = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'chats'
        })
        console.log('messages', data);
        if (data.data.status == 200) {
            setMessages(data.data.messages);
        }
    }

    const postMessage = async () => {
        const params = {
            messages: value,
            user_id: userDetails.id,
            user_name: userDetails.name,

        }
        const data = await axios({
            method: 'post',
            url: url+'chats',
            params: params
        })
        console.log('messages', data);
        if(data.data.status == 200){
            setValue('');
            getMessages();
            message.success('Сообщение добавлено!', 5);
        }
    }
    useEffect(() => {
        getMessages();
    }, []);
    return (
        <>
            <Header />
            <div className="col-12">
                <div className="row">
                    <div className="col-12">
                        <h4>Общий чат</h4>
                    </div>
                    <div
                        className="col-12 bg-secondary-subtle p-5"
                        style={{ height: '500px', overflowY: 'scroll' }}
                    >
                        <div className="row">
                            {messages.length > 0 ?
                                <>
                                    {messages.map((i)=>
                                    <>
                                    {i.user_id == userId ?
                                    <div className="col-12 d-flex justify-content-end">
                                        <span className="bg-white rounded mt-3 pt-0 p-3">
                                            <div className="text-end text-muted">
                                                <small className="text-info" style={{ fontSize: 10 }}>{i.user_name}</small>
                                            </div>
                                            <span style={{ fontSize: 13 }}>{i.message}</span>
                                            <br />
                                            <div className="text-end">
                                                <small className="text-muted" style={{ fontSize: 10 }}>{moment(i.date).calendar()}</small>
                                            </div>
                                        </span>
                                    </div>
                                    :
                                    <div className="col-12 d-flex justify-content-start">
                                        <span className="bg-white rounded mt-3 pt-0 p-3">
                                            <div className="text-start text-muted">
                                                <small className="text-info" style={{ fontSize: 10 }}>{i.user_name}</small>
                                            </div>
                                            <span style={{ fontSize: 13 }}>{i.message}</span>
                                            <br />
                                            <div className="text-start">
                                                <small className="text-muted" style={{ fontSize: 10 }}>{moment(i.date).calendar()}</small>
                                            </div>
                                        </span>
                                    </div>
                                    }
                                    </>
                                    )
                                }
                                </>
                                : <></>
                            }
                        </div>
                    </div>
                    <div className="col-12 pt-3">
                        <textarea
                        onChange={(e)=>setValue(e.target.value)}
                        value={value} 
                        placeholder="Введите свое сообщение..." 
                        name="" 
                        id="" 
                        className="form-control" 
                        rows="10">

                        </textarea>
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary mt-2" onClick={postMessage}>
                                Отправить сообщение
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Chat;