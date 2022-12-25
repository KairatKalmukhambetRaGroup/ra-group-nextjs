import axios from "axios";
import { useEffect, useState } from "react";
import AdminHeader from "../../../components/AdminHeader";
import Alert from "../../../components/Alert";
import VCardForm from "../../../components/VCardForm";

const initVCard = {link: '', firstname: '', lastname: '', email: '', website: '', mobile: '', workphone: '', fax: '', organization: '', workplace: '', country: '', city: ''};

const VCardCreate = () => {
    const [vcardForm, setVcardForm] = useState(initVCard);
    const [alertShow, setAlertShow] = useState(false);
    const [alert, setAlert] = useState({type: '', message: ''});

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
        const status = resData.status;
        if(status >=200 && status < 300){
            setAlert({type: 'success', message: 'VCard saved successfully'});
            setAlertShow(true);
        }else{
            setAlert({type: 'error', message: 'Something went wrong! Please, try later'});
            setAlertShow(true);
        }
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
            <Alert show={alertShow} setShow={setAlertShow} alertType={alert.type} message={alert.message} />
            <div id="vcard-create">
                <div className="semibold-32-48">Create VCard</div>
                <VCardForm data={vcardForm} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div> 
        </>
    );
};

export default VCardCreate;