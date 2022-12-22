import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import AdminHeader from "../../../../components/AdminHeader";
import VCardForm from "../../../../components/VCardForm";

const initVCard = {link: '', firstname: '', lastname: '', email: '', website: '', mobile: '',workphone: '', fax: '', organization: '', workplace: '', country: '', city: ''};

const VCard = () => {
    const router = useRouter();
    const {link} = router.query;
    const [vcardForm, setVcardForm] = useState(initVCard);

    async function fetchVCard(link){
        const resData = await axios.get(`/api/vcards/${link}?type=edit`);
        console.log(resData.data)
        setVcardForm(resData.data);
    }

    async function updateVCard(data) {
        const resData = await axios.patch('/api/vcards', data);
        console.log(resData);
     }

    useEffect(()=> {
        if(link && !vcardForm.link){
            fetchVCard(link);
        }
    }, [link])


    const handleChange = (e) => {
        e.preventDefault();
        setVcardForm({...vcardForm, [e.currentTarget.name]: e.currentTarget.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateVCard(vcardForm);
    }

    return (
        <>
            <AdminHeader />
            <div id="vcard-edit">
                <div className="semibold-32-48">Edit VCard</div>
                <VCardForm data={vcardForm} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
        </>
    );
}

export default VCard;