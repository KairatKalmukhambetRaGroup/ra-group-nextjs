import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react";

const QRId = () => {
    const router = useRouter();
    const {link} = router.query;

    // async function fetchVCard() {
    //     const data = await axios.get(`/api/qr/${link}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
        
    // }

    useEffect(()=>{
        if(link){

            // fetchVCard();
            // var url = window.URL || window.webkitURL;
            // link = url.createObjectURL(blob);
            var a = document.createElement("a");
            a.setAttribute("download", link);
            a.setAttribute("href", `/api/vcards/${link}`);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.close();
        }
    },[link])

    
    return (
        <div>
            {link}
        </div>
    )
}

export default QRId;