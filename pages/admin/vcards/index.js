import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import VCardItem from "../../../components/admin/VCardItem";
import AdminHeader from "../../../components/AdminHeader";

const VCards = () => {
    const [vcards, setVcards] = useState({current: [], total: 0});
    const [page, setPage] = useState({current: 1, total: 1});
    

    async function fetchVcards(page) {
        const resData = await axios.get(`/api/vcards?page=${page}`);
        const {vcards, page:pg, totalPages, limit, count} = resData.data;
        console.log(vcards);
        setVcards({current: vcards, total: count});
        setPage({current: pg, total: totalPages});
    }
    
    useEffect(()=>{
        if(vcards.current.length === 0){
            fetchVcards(1);
        }
    }, [vcards.current]);

    return (
        <>
            <AdminHeader/>
            <div id="vcards">
                <div className="content">
                    <div className="row">
                        <div className="semibold-32-48">VCards</div>
                        <div className="btn">
                            <Link href="vcards/create">CREATE</Link>
                        </div>
                    </div>
                    <div className="vcards">
                        {vcards.current.length>0 && vcards.current.map((vcard, key) => (
                            <VCardItem key={key} vcard={vcard} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default VCards;