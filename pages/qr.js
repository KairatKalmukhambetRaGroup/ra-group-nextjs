import axios from 'axios';
import { useEffect, useState } from "react";

const QR = () => {
    const [ip, setIp] = useState(null);

    useEffect(()=>{
        if(!ip){
            getIP();
        }
    }, [ip])

    async function getIP(){
        const {data} = await axios.get('https://api.ipify.org?format=json');
        console.log(data.ip);
        setIp(data.ip);
    }

    return (
        <>
            {ip}
        </>
    )
};

export default QR;