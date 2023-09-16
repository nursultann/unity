const Forgot = ()=>{
    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center" style={{marginTop : "100px"}}>
                        <div className="col-5 text-center bg-info text-white p-3 px-5">
                                <h1 className="text-center">Забыли пароль?</h1>
                                <input type="text" placeholder="996555112233" className="form-control mt-4"/>
                                <input type="number" placeholder="Код подтверждения" className="form-control mt-4"/>
                                <a href="#" className="btn btn-primary mt-3">Отправить код подтверждения</a><br />
                                <a className="text-white" href="/register">Регистрация</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Forgot;