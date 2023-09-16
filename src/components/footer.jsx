import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../global_variables/variables";

const Footer = () => {
    const [tableData,setTableData] = useState(null);
    const pageTo = (url)=>{
        window.location.href = url;
    }
    const getTableDetails = async ()=>{
        const data = await axios({
            method:'get',
            url:url+'balance-update',
        })
        console.log('table data', data);
        if(data.data.status == 200){
            setTableData(data.data.balance[0]);
        }
    } 
    useEffect(()=>{
        getTableDetails();
    },[])
    return (
        <div className="col-12 mt-5 p-4 bg-inf">
            {tableData != null ?
            <div className="row">
                <div className="col-3 text-white">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro ipsa cupiditate dicta, totam pariatur aut magni nesciunt quidem incidunt veritatis vero unde rem quia officiis quod minus dolorum, ab ut!
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <div className="bg-white rounded">
                                        <h3 className="col-12 text-center">
                                            {(tableData.service_painment)-(((tableData.service_painment)*16)/100)}
                                        </h3>
                                        <h6 className="col-12 text-center bg-secondary-subtle rounded">Плата за обслуживание</h6>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="bg-white rounded">
                                        <h3 className="col-12 text-center">
                                            {((tableData.service_painment)*3)/100}
                                        </h3>
                                        <h6 className="col-12 text-center bg-secondary-subtle rounded">Налог 3%</h6>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="bg-white rounded">
                                        <h3 className="col-12 text-center">
                                        {((tableData.service_painment)*3)/100}
                                        </h3>
                                        <h6 className="col-12 text-center bg-secondary-subtle rounded">Налог 3%</h6>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="bg-white rounded">
                                        <h3 className="col-12 text-center">
                                        {((tableData.service_painment)*10)/100}
                                        </h3>
                                        <h6 className="col-12 text-center bg-secondary-subtle rounded">Доброта 10%</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <div className="bg-white rounded">
                                        <h3 className="col-12 text-center text-danger">
                                            {tableData.main_sum}
                                        </h3>
                                        <h6 className="col-12 text-center bg-secondary-subtle rounded">Основные суммы</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :<></>
}
        </div>
    )
}
export default Footer;