import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import axios from "axios";
import { url } from "../global_variables/variables";

const Main = () => {
    const local = localStorage.getItem('token');
    const [userDetails, setUserDetails] = useState(null);
    const [tableData, setTableData] = useState(null);
    const pageTo = (url) => {
        window.location.href = url;
    }
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
            console.log('local', data);
            if (data.data.status == 200) {
                setUserDetails(data.data.user[0]);
            }
        }
    }
    useEffect(() => {
        checkLogged();
    }, []);
    const getTableDetails = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'table-users',
        })
        console.log('table data', data);
        if (data.data.status == 200) {
            setTableData(data.data.users);
        }
    }
    useEffect(() => {
        getTableDetails();
    }, []);
    const [searchResult, setSearchResult] = useState(null);
    const Search = (value) => {
        const search = tableData.filter((i) => i.name == value || i.lastname == value);
        if (search.length > 0) {
            setSearchResult(search);
        } else {
            setSearchResult(null);
        }
    }
    return (
        <>
            <Header />
            <div className="col-12 bg-secondary-subtle p-4">
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate voluptatem pariatur in consectetur et molestiae aspernatur provident fugiat minima, maiores quidem. Cumque facilis magnam alias voluptas quis voluptates sapiente optio.
                            </div>
                            <div className="col-12 py-4">
                                <input type="search" placeholder="Поиск" className="form-control" onChange={(e) => { Search(e.target.value) }} name="" id="" />
                            </div>
                            {searchResult != null ?
                                <>
                                    <div className="col-12">
                                        <table className="list">
                                            <tr>
                                                <th>
                                                    №
                                                </th>
                                                <th>
                                                    ФИО
                                                </th>
                                                <th>
                                                    Плата за обслуживание
                                                </th>
                                                <th>
                                                    Основные суммы
                                                </th>
                                                <th>
                                                    Вперед
                                                </th>
                                            </tr>

                                            {searchResult.map((item) =>
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td>{item.lastname + ' ' + item.name + ' ' + (item.middname != undefined ? item.middname : '')}</td>
                                                    <td>2000</td>
                                                    <td>20000</td>
                                                    <td>{item.balance}</td>
                                                </tr>
                                            )
                                            }


                                        </table>
                                    </div>
                                </>
                                :
                                <>
                                </>
                            }
                            <div className="col-12 mt-3">
                                <table className="list">
                                    <tr>
                                        <th>
                                            №
                                        </th>
                                        <th>
                                            ФИО
                                        </th>
                                        <th>
                                            Плата за обслуживание
                                        </th>
                                        <th>
                                            Основные суммы
                                        </th>
                                        <th>
                                            Вперед
                                        </th>
                                    </tr>
                                    {tableData != null ?
                                        <>
                                            {tableData.map((item) =>
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td>{item.lastname + ' ' + item.name + ' ' + (item.middname != undefined ? item.middname : '')}</td>
                                                    <td>2000</td>
                                                    <td>20000</td>
                                                    <td>{item.balance}</td>
                                                </tr>
                                            )
                                            }

                                        </>
                                        :
                                        <>


                                        </>
                                    }
                                </table>
                                {userDetails != null ?
                                    <>
                                        {userDetails.status == 0 ?
                                            <button onClick={() => pageTo('/edit')} className="col-12 mt-3 btn btn-light rounded-pill">
                                                Добавить в список
                                            </button>
                                            : <></>
                                        }
                                    </>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className="col-12">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, iste, aspernatur labore illum expedita voluptas dignissimos rerum atque iure maiores autem dicta ad in officia quaerat nesciunt molestias rem saepe!
                            </div>
                            <div className="col-12">
                                <input type="search" placeholder="Поиск" className="form-control" src="" alt="" />
                            </div>
                            <div className="col-12 py-4">
                                <table className="list2">
                                    <tr>
                                        <th>
                                            №
                                        </th>
                                        <th>
                                            ФИО
                                        </th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Main;