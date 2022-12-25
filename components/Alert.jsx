import React from "react";
import { useEffect } from "react";

const Alert = ({alertType='success', show=false, setShow, message='Test'}) => {
    const closeAlert = (e) => {
        e.preventDefault();
        setShow(false);
    }

    useEffect(()=>{
        if(show){
            const timeId = setTimeout(()=>{
                setShow(false);
            }, 5000)
        }
    }, [show])

    return (
        <div className={`alert ${show ? '' : 'hidden'}`}>
            <span className="close" onClick={closeAlert}><i></i></span>
            <div className="content">
                <span className={alertType}><i></i></span>
                {message}
            </div>
            <div className={`bottom ${alertType}`}>
                <div className="line"></div>
            </div>
        </div>
    );
}

export default Alert;