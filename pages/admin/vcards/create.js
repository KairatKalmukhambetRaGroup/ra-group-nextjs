import axios from "axios";
import { useEffect, useState } from "react";
import AdminHeader from "../../../components/AdminHeader";
import VCardForm from "../../../components/VCardForm";

const initVCard = {link: '', firstname: '', lastname: '', email: '', website: '', mobile: '', workphone: '', fax: '', organization: '', workplace: '', country: '', city: ''};

const VCardCreate = () => {
    const [vcardForm, setVcardForm] = useState(initVCard);

    useEffect(()=>{
        if(!vcardForm.link)
            createLink();
    }, [vcardForm.link])
    
    async function createLink() {
        const resData = await axios.post('/api/vcards');
        const {link} = resData.data;
        setVcardForm({...vcardForm, link});
    }

    async function createVCard(data) {
       const resData = await axios.patch('/api/vcards', data);
    }
    
    
    const handleChange = (e) => {
        e.preventDefault();
        setVcardForm({...vcardForm, [e.currentTarget.name]: e.currentTarget.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createVCard(vcardForm);
    }


    return (
        <>
            <AdminHeader/>
            <div id="vcard-create">
                <div className="semibold-32-48">Create VCard</div>
                <VCardForm data={vcardForm} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div> 
        </>
    );
};

export default VCardCreate;