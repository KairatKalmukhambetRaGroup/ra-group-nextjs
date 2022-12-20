import { useRouter } from "next/router"
import { useEffect } from "react";

const QRId = () => {
    const router = useRouter();
    const {link} = router.query;

    
    useEffect(()=>{
        if(link){
            router.push(`/api/vcards/${link}`)
        }
    },[link])

}

export default QRId;