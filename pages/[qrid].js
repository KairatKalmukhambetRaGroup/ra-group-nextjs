import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react";

const QRId = () => {
    const router = useRouter();
    const {qrid} = router.query;

    // async function fetchVCard() {
    //     const data = await axios.get(`/api/qr/${qrid}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
        
    // }

    useEffect(()=>{
        if(qrid){

            // fetchVCard();
            // var url = window.URL || window.webkitURL;
            // link = url.createObjectURL(blob);
            var a = document.createElement("a");
            a.setAttribute("download", qrid);
            a.setAttribute("href", `/api/qr/${qrid}`);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.close();
        }
    },[qrid])

    
    return (
        <div>
            {qrid}
        </div>
    )
}

export default QRId;