import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react";

const QRId = () => {
    const router = useRouter();
    const {link} = router.query;

    async function getIP(){
        const {data} = await axios.get('https://api.ipify.org?format=json');
        // console.log(data.ip);
        return data.ip;
    }
    

    
    useEffect(async ()=>{
        if(link){
            const ip = await getIP();

            router.push(`/api/vcards/${link}?ip=${ip}`)
        }
    },[link])

}

export default QRId;