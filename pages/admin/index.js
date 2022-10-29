import axios from "axios";
import decode from 'jwt-decode';
import Router from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";


export default function Admin() {
    const [applications, setApplications] = useState([]);
    const [profile, setProfile] = useState(null);
    
    useEffect(()=>{
        async function fetchData() {
            if(!applications || applications.length === 0){
                const resData = await axios.get('/api/applications');
                setApplications(resData.data);
                console.log(resData.data);
            }
        }
        fetchData();
    }, [applications]);

    useEffect(() => {
        if(profile && profile.user && profile.token){
            const token = profile.token;
            if (token) {
                const decodedToken = decode(token);
          
                if (decodedToken.exp * 1000 <= new Date().getTime()){
                    localStorage.removeItem('profile');  
                }
            }
        }else{
            if (typeof window !== "undefined") {
                const user = JSON.parse(localStorage.getItem('profile'));
                if(user)
                    setProfile(user);
                else
                    Router.push('/admin/login');
            }else{
                Router.push('/admin/login');
            }
        }
    }, [profile])
    return (
        <div id="admin">
            <Head>
                <title>RA Group | Admin panel</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <div className="container"> */}
                <div className="content">
                    <div className="semibold-32-48">Заявки на консультацию</div>

                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Имя Фамилия</th>
                                <th>Компания</th>
                                <th>Электронная почта</th>
                                <th>Формат</th>
                                <th>ПО</th>
                                <th>Язык</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications && applications.map((application, key) => (
                                <tr key={key}>
                                    <td className="number">{key+1}</td>
                                    <td>{application.firstname} {application.lastname}</td>
                                    <td>{application.companyName}</td>
                                    <td>
                                        <a href={`mailto:${application.email}`}>
                                            {application.email}
                                        </a>
                                    </td>
                                    <td>{application.format}</td>
                                    <td>
                                        <div className="os-container">
                                            {application.os && application.os.length>0 && application.os.map((oss, j)=> (
                                                <div key={j} className="os">{oss}</div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>{application.lang}</td>
                                    <td>{application.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            {/* </div> */}
        </div>
    );
}