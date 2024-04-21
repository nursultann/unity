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
            if (data.data.status === 200) {
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
        });
        console.log('table data', data);
        if (data.data.status === 200) {
            setTableData(data.data.users);
            let arr = [];
            for (let i = 0; i < data.data.users.length; i++) {
                arr = [];
            }
        }
    }
    useEffect(() => {
        getTableDetails();
        getPainmentReports();
    }, []);
    const [searchResult, setSearchResult] = useState(null);
    const Search = (value) => {
        const search = tableData.filter((i) => i.name == value || i.lastname == value || i.name.toLowerCase() == value || i.lastname.toLowerCase() == value);
        if (search.length > 0) {
            setSearchResult(search);
        } else {
            setSearchResult(null);
        }
    }
    const [painment, setPainment] = useState(null);
    const getPainmentReports = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'report-painment'
        });
        if (data.data.status === 200) {
            setPainment(data.data.report_painment);
        } else {
            setPainment(null);
        }
    }

    return (
        <>
            <Header />
            <div className="row">
                <div className="col-12 bg-secondary-subtle p-lg-4">
                    <div className="row mx-0">
                        <div className="col-lg-8 p-1">
                            <div className="row">
                                <div className="col-12 p-3 px-lg-0">
                                    Бул тизмеге турак-жай кыймылсыз мүлк алуу үчүн кезекте турган жарандар кирет.
                                    Кезекке туруу үчүн сиздин атыңызда кыймылсыз мүлктүн жоктугун тастыктаган маалымкат керек.
                                    Үй-бүлөлүү болсоңуз, нике күбөлүгү талап кылынат.
                                </div>
                                <div className="col-12 py-4">
                                    <input type="search" placeholder="Издөө" className="form-control" onChange={(e) => { Search(e.target.value) }} name="" id="" />
                                </div>
                                {searchResult != null ?
                                    <>
                                        <div className="col-12">
                                            <table className="list">
                                                <tr>
                                                    <th>
                                                        Аты жөнү
                                                    </th>
                                                    <th>
                                                        Кызмат көрсөтүүгө болгон төлөм
                                                    </th>
                                                    <th>
                                                        Негизги эсеп
                                                    </th>
                                                    <th>
                                                        Кезегиңизди аныктоочу эсебиңиз
                                                    </th>
                                                </tr>
                                                {searchResult.map((item) =>
                                                    <>
                                                        {item.status == 2 ?
                                                            <tr>
                                                                <td className="bg-success-subtle">{item.lastname + ' ' + item.name + ' ' + (item.middname !== undefined ? item.middname : '')}
                                                                    <span style={{ fontSize: '6pt', float: 'inline-end' }} className="text-muted">{item.date_registr}</span></td>
                                                                <td className="bg-secondary-subtle">2000</td>
                                                                <td>20000</td>
                                                                <td className="bg-secondary-subtle">{item.balance}</td>
                                                            </tr>
                                                            :
                                                            <tr>
                                                                <td>{item.lastname + ' ' + item.name + ' ' + (item.middname !== undefined ? item.middname : '')}
                                                                    <span style={{ fontSize: '6pt', float: 'inline-end' }} className="text-muted">{item.date_registr}</span></td>
                                                                <td className="bg-secondary-subtle">2000</td>
                                                                <td>20000</td>
                                                                <td className="bg-secondary-subtle">{item.balance}</td>
                                                            </tr>
                                                        }
                                                    </>
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
                                            <th className="table-name">
                                                Аты жөнү
                                            </th>
                                            <th className="bg-secondary-subtle">
                                                Кызмат көрсөтүүгө <br /> болгон төлөм
                                            </th>
                                            <th>
                                                Негизги эсеп
                                            </th>
                                            <th className="bg-secondary-subtle">
                                                Кезегиңизди аныктоочу <br /> эсебиңиз
                                            </th>
                                        </tr>
                                        {tableData != null ?
                                            <>
                                                {tableData.map((item) =>
                                                    <>
                                                        {item.status == 2 ?
                                                            <tr>
                                                                <td style={{ width: '30%' }} className="bg-success-subtle">{item.lastname + ' ' + item.name + ' ' + (item.middname !== undefined ? item.middname : '')}
                                                                    <span style={{ fontSize: '6pt', float: 'inline-end' }} className="text-muted">{item.date_registr}</span></td>
                                                                <td className="bg-secondary-subtle">2000</td>
                                                                <td>20000</td>
                                                                <td className="bg-secondary-subtle">{item.balance}</td>
                                                            </tr>
                                                            :
                                                            <tr>
                                                                <td style={{ width: '30%' }}>{item.lastname + ' ' + item.name + ' ' + (item.middname !== undefined ? item.middname : '')}
                                                                    <span style={{ fontSize: '6pt', float: 'inline-end' }} className="text-muted">{item.date_registr}</span></td>
                                                                <td className="bg-secondary-subtle">2000</td>
                                                                <td>20000</td>
                                                                <td className="bg-secondary-subtle">{item.balance}</td>
                                                            </tr>
                                                        }
                                                    </>
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
                                                    Тизмеге кошулуу
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
                        <div className="col-lg-4 pe-4 pe-lg-0 ps-4 ps-lg-5">
                            <div className="row mt-3">
                                <div className="col-12">
                                    <p>Платформа аркылуу кыймылсыз мүлккө ээ болгон
                                        жарандардын тизмеси
                                    </p>
                                </div>
                                <div className="col-12">
                                    <input type="search" placeholder="Издөө" className="form-control" src="" alt="" />
                                </div>
                                <div className="col-12 py-4">
                                    <table className="list">
                                        <tr>
                                            <th>
                                                №
                                            </th>
                                            <th>
                                                ФИО
                                            </th>
                                        </tr>
                                        {painment != null ?
                                            <>
                                                {painment.map((item) =>
                                                    <tr>
                                                        <td>{item.id}</td>
                                                        <td>{item.lastname + ' ' + item.name}</td>
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