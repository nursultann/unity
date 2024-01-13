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
        <div className="row mt-2">
            <div className="col-12 p-4 bg-inf">
                {tableData != null ?
                    <div className="row">
                        <div className="col-lg-3 text-white d-flex align-items-end">
                            <p>
                                “Негизги эсеп” көрсөтүлгөн сумма биринчи кезекте турган адамга, талаптардын жана чектөөлөрдүн негизинде өзү тандаган турак жай менен камсыз кылуу үчүн жумшалат.
                                Топтолгон сумманын чеги Кыргыз Республикасынын аймагындагы жашоого баардык шарты бар эки бөлмөлүү батирлердин орточо баасына каралган.Жана бул баа ар жылда ар кандай көрсөткүчүнө карап өсө берет.
                                Басса белгилөөчү нерсе Кыргыз Республикасынын эч кандай турак жайга ээлик кылбаган жарандары гана катоого туруусу шарт.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="bg-white rounded">
                                                <h5 className="col-12 text-center">
                                                    {(tableData.service_painment) - (((tableData.service_painment) * 16) / 100)}
                                                </h5>
                                                <h6 className="col-12 text-center bg-secondary-subtle rounded">Кызмат көрсөтүүгө болгон төлөм</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="bg-white rounded">
                                                <h5 className="col-12 text-center">
                                                    {((tableData.service_painment) * 3) / 100}
                                                </h5>
                                                <h6 className="col-12 text-center bg-secondary-subtle rounded">Салык 3%</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="bg-white rounded">
                                                <h5 className="col-12 text-center">
                                                    {((tableData.service_painment) * 3) / 100}
                                                </h5>
                                                <h6 className="col-12 text-center bg-secondary-subtle rounded">Салык 3%</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="bg-white rounded">
                                                <h5 className="col-12 text-center">
                                                    {((tableData.service_painment) * 10) / 100}
                                                </h5>
                                                <h6 className="col-12 text-center bg-secondary-subtle rounded">Кайрымдуулук 10%</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="bg-white rounded">
                                                <h5 className="col-12 text-center text-danger">
                                                    {tableData.main_sum}
                                                </h5>
                                                <h6 className="col-12 text-center bg-secondary-subtle rounded">Негизги эсеп</h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 text-center p-3">
                                            <a className="btn btn-warning text-white px-1 p-0" onClick={showModal}>
                                                Көзөмөл
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 text-white d-flex align-items-end">
                                    “Көзөмөл” баскычы аркылуу кызмат көрсөтүүгө болгон чыгымдар жана төлөмдөрдүн бөлүштүрүү кыймылы сакталып көрсөтүлөт.
                                    Бул нерсени веб сайтка кирген учурдан тартып көрө аласыз
                                </div>
                                <div className="col-lg-6 text-white pt-lg-5">
                                    <h3>Дарегибиз:</h3>
                                    Ош шаары Масалиева көчөсү <br />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 text-white">
                            <p><b>Биз менен байланышыныз:</b></p>
                            <img className="mb-2" src={whatsapp} alt="" width={20} height={20} /> &nbsp;&nbsp;+996 998 166 696 <br />
                            <img className="mb-2" src={gmail} alt="" width={20} height={20} />  &nbsp;&nbsp;unity.2023kg@gmail.com <br />
                            <img className="mb-2" src={mail} alt="" width={20} height={20} />  &nbsp;&nbsp;unity_unity@internet.ru <br />
                            <img src={youtube} alt="" width={20} height={20} /> &nbsp;&nbsp;UNITY KG
                        </div>
                    </div>
                    : <></>
                }
                <Modal title="" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
                    <div className="row">
                        <div className="col-12 px-0">
                            <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Компаниянын жалпы чыгымы</button>
                                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Турак жай үчүн төлөнгөн төлөмдөрдүн көрсөткүчү</button>
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
                                            <td>Кызмат көрсөтүүгө болгон төлөм</td>
                                            <td>Салык 3%</td>
                                            <td>Салык 3%</td>
                                            <td>Кайрымдуулук 10%</td>
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
                                        <p className="text-center text-secondary p-3"> </p>
                                    </>
                                }
                            </table>
                        </div>
                        <div class="tab-pane fade mt-3" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                            <table className="list">
                                {painment1 != null ?
                                    <>
                                        <tr>
                                            <td>ID</td>
                                            <td>Дата</td>
                                            <td>ФИО</td>
                                            <td>Кызмат көрсөтүүгө болгон төлөм</td>
                                            <td>Төлөм</td>
                                        </tr>
                                        {painment1.map((item) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td className="date">{item.date_of_amount}</td>
                                                <td>{item.lastname + ' ' + item.name + ' ' + (item.middname != undefined ? item.middname : '')}</td>
                                                <td>2000</td>
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