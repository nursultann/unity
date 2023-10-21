import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../global_variables/variables";
import { Modal } from "antd";
import whatsapp from '../img/Ватсап.png';
import gmail from '../img/почта жмайл.png';
import mail from '../img/потча майл.png';
import youtube from '../img/ютубе.png';
const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [tableData, setTableData] = useState(null);
    const [painment1, setPainment1] = useState(null);
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
    const pageTo = (url) => {
        window.location.href = url;
    }
    const getTableDetails = async () => {
        const data = await axios({
            method: 'get',
            url: url + 'balance-update',
        })
        console.log('table data', data);
        if (data.data.status == 200) {
            setTableData(data.data.balance[0]);
        }
    }
    useEffect(() => {
        getTableDetails();
        getPainmentReports1();
    }, []);
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
    useEffect(() => {
        getReports();
    }, [])
    return (
        <div className="row">
            <div className="col-12 mt-5 p-4 bg-inf">
                {tableData != null ?
                    <div className="row">
                        <div className="col-3 text-white">
                            <p>
                                Кыргызстан, Ош <br />
                                Кыргызстан, Ош <br />
                                Кыргызстан, Ош <br />
                                Кыргызстан, Ош <br />
                                Кыргызстан, Ош Кыргызстан, Ош <br />
                                Кыргызстан, Ош Кыргызстан, Ош <br />
                                Кыргызстан, Ош Кыргызстан, Ош<br />
                                Кыргызстан, Ош Кыргызстан, Ош<br />
                            </p>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="bg-white rounded">
                                                <h5 className="col-12 text-center">
                                                    {(tableData.service_painment) - (((tableData.service_painment) * 16) / 100)}
                                                </h5>
                                                <h6 className="col-12 text-center bg-secondary-subtle rounded">Плата за обслуживание</h6>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="bg-white rounded">
                                                <h5 className="col-12 text-center">
                                                    {((tableData.service_painment) * 3) / 100}
                                                </h5>
                                                <h6 className="col-12 text-center bg-secondary-subtle rounded">Налог 3%</h6>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="bg-white rounded">
                                                <h5 className="col-12 text-center">
                                                    {((tableData.service_painment) * 3) / 100}
                                                </h5>
                                                <h6 className="col-12 text-center bg-secondary-subtle rounded">Налог 3%</h6>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="bg-white rounded">
                                                <h5 className="col-12 text-center">
                                                    {((tableData.service_painment) * 10) / 100}
                                                </h5>
                                                <h6 className="col-12 text-center bg-secondary-subtle rounded">Доброта 10%</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="bg-white rounded">
                                                <h5 className="col-12 text-center text-danger">
                                                    {tableData.main_sum}
                                                </h5>
                                                <h6 className="col-12 text-center bg-secondary-subtle rounded">Основные суммы</h6>
                                            </div>
                                        </div>
                                        <div className="col-6 text-center p-3">
                                            <a className="btn btn-warning text-white px-1 p-0" onClick={showModal}>
                                                Контроль
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 text-white">
                                    Кыргызстан, Ош <br />
                                    Кыргызстан, Ош <br />
                                    Кыргызстан, Ош <br />
                                </div>
                                <div className="col-6 text-white">
                                    <h3>Адрес:</h3>
                                    Кыргызстан, Ош <br />
                                </div>
                            </div>
                        </div>
                        <div className="col-3 text-white">
                            <p><b>Связаться с нами:</b></p>
                            <img src={whatsapp} alt="" width={20} height={20} /> +996 998 166 696 <br />
                            <img src={gmail} alt="" width={20} height={20} /> unity.2023kg@gmail.com <br />
                            <img src={mail} alt="" width={20} height={20} /> unity_unity@internet.ru <br />
                            <img src={youtube} alt="" width={20} height={20} /> UNITY KG
                        </div>
                    </div>
                    : <></>
                }
                <Modal title="Отчет по обслуживанию" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
                    <div className="row">
                        <div className="col-12 px-0">
                            <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Отчет по обслуживанию</button>
                                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Отчет по ежемесячным выплатам</button>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div class="tab-content mt-3" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
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
                                                <td>{item.service_painment - (((item.service_painment) * 16) / 100)}</td>
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
                        </div>
                        <div class="tab-pane fade mt-3" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                            <table className="list">
                                {painment1 != null ?
                                    <>
                                        {painment1.map((item) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td className="date">{item.date_of_amount}</td>
                                                <td>{item.lastname + ' ' + item.name + ' ' + (item.middname != undefined ? item.middname : '')}</td>
                                                <td>{item.sum}</td>
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

                </Modal>
            </div>
        </div>
    )
}
export default Footer;