import React from "react";
import QRCode from "qrcode-svg";
import { useEffect } from "react";


const VCardStyle = ({data}) => {

    useEffect(()=>{
        if(data){
            var qrcode = new QRCode({
                content: `ragroup.org/${data.link}`,
                padding: 0,
                color: '#FFFFFF',
                background: '#0B1832',
                width: 66,
                height: 66,
                container: "svg-viewbox", //Responsive use
                join: true //Crisp rendering and 4-5x reduced file size
            });
            document.getElementById('style-qr').innerHTML = qrcode.svg();
        }
    }, [data]);

    return data && (
        <div className="vcard-style dark-h">
            <div className="top">
                <div className="fullname">{data.firstname} {data.lastname}</div>
                {data.workplace}
            </div>
            <div className="bottom">
                <div className="contacts">
                    {data.website && `${data.website}`}
                    <div className="other">
                        {data.mobile && <span>{data.mobile}</span>}
                        {data.workphone && <span>{data.workphone}</span>}
                        {data.email && <span>{data.email}</span>}
                    </div>
                </div>
                <div id="style-qr">
                </div>
            </div>
        </div>
    );
};

export default VCardStyle;