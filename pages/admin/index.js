import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";


export default function Admin() {
    const [applications, setApplications] = useState([]);
    
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
    return (
        <div id="admin">
            <Head>
                <title>RA Group | Admin panel</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <div className="semibold-28-32 text-center">Applications</div>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fullname</th>
                            <th>E-mail</th>
                            <th>Company Name</th>
                            <th>Format</th>
                            <th>OS</th>
                            <th>Language</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications && applications.map((application, key) => (
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{application.firstname} {application.lastname}</td>
                                <td>
                                    <a href={`mailto:${application.email}`}>
                                        {application.email}
                                    </a>
                                </td>
                                <td>{application.companyName}</td>
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
        </div>
    );
}