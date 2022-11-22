import QRCode from 'qrcode-svg';
import { useEffect } from "react";

const QR = () => {
    var qrcode = new QRCode({
        content: 'ragroup.org/1234567890',
        container: "svg-viewbox", //Responsive use
        join: true //Crisp rendering and 4-5x reduced file size
      });
      useEffect(()=>{
        if(qrcode)
            document.getElementById('svg').innerHTML = qrcode.svg();
    }, qrcode)
    return (
        <>
            <h1>QR</h1>
        {/* <Image src={svg} /> */}
            <div id="svg" style={{'width': '500px'}}>
                {/* {qrcode ? qrcode : } */}
            </div>
        </>
    )
};

export default QR;