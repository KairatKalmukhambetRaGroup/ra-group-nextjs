import axios from "axios";
import decode from 'jwt-decode';
import Router from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import AdminHeader from "../../components/AdminHeader";

import { FormattedMessage , useIntl} from "react-intl";
import Pagination from "../../components/Pagination";

const language = {ru: 'RU',kz: 'KZ',en: 'EN'};

const today = new Date(new Date().setUTCHours(0,0,0,0));
const oneDay = (1000 * 60 * 60 * 24);
const rangeInitials = {start: new Date(today.valueOf() - (6 * oneDay)), end: today, group: 'lastWeek'};

export default function Admin() {
    const intl = useIntl();
    const [applications, setApplications] = useState([]);
    const [totalApplications, setTotalApplications] = useState(0);
    const [profile, setProfile] = useState(null);
    const [tableRange, setTableRange] = useState(rangeInitials);
    // const [page, setPage] = useState(pg ? pg : 1);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    async function fetchData(page, start, end) {
        const resData = await axios.get(`/api/applications?page=${page}&start=${start}&end=${end}`);
        const {applications, page:pg, totalPages: tp, limit, count} = resData.data;
        setApplications(applications);
        if(page !== pg)
            setPage(pg);
        setTotalPages(tp);
        setTotalApplications(count);
    }
    
    
    useEffect(()=>{
        fetchData(page, tableRange.start, tableRange.end);
    }, [tableRange, page]);

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
    }, [profile]);

    function numMonthToString(num) {
        switch (Number(num)) {
            case 1:
                return intl.formatMessage({id:"month.january"}); 
            case 2:
                return intl.formatMessage({id:"month.february"}); 
            case 3:
                return intl.formatMessage({id:"month.march"}); 
            case 4:
                return intl.formatMessage({id:"month.april"}); 
            case 5:
                return intl.formatMessage({id:"month.may"}); 
            case 6:
                return intl.formatMessage({id:"month.june"}); 
            case 7:
                return intl.formatMessage({id:"month.july"}); 
            case 8:
                return intl.formatMessage({id:"month.august"}); 
            case 9:
                return intl.formatMessage({id:"month.september"}); 
            case 10:
                return intl.formatMessage({id:"month.october"}); 
            case 11:
                return intl.formatMessage({id:"month.november"}); 
            case 12:
                return intl.formatMessage({id:"month.december"}); 
            default:
                return null;
        }
    }

    function dateFormat(data) {
        const dateString = new Date(data).toLocaleDateString(undefined, {timeZone: 'Asia/Almaty' });
        let date = (dateString.split("T")[0]).split("-");
        let time = ((dateString.split("T")[1]).split(".")[0]).split(":");

        let year = date[0];
        let month = date[1];
        let day = Number(date[2]);

        // return date + " " + time;
        return `${time[0]}:${time[1]} ${day} ${numMonthToString(month).toLowerCase()} ${year}`;
    }

    function printRange() {
        var start = tableRange.start.getFullYear() === tableRange.end.getFullYear() ? 
            `${numMonthToString(tableRange.start.getMonth()+1)} ${tableRange.start.getDate()}`
            :  
            `${numMonthToString(tableRange.start.getMonth()+1)} ${tableRange.start.getDate()}, ${tableRange.start.getFullYear()}`;
        var end = `${numMonthToString(tableRange.end.getMonth()+1)} ${tableRange.end.getDate()}, ${tableRange.end.getFullYear()}`;
        var group = intl.formatMessage({id: `admin.table.filter.${tableRange.group}`});
        return start + " - " + end + " " + group;
    }
    const changeTableRange = (e) => {
        const value = e.currentTarget.dataset.range;
        let range = rangeInitials;
        const tmpStart = new Date(today.valueOf());
        switch (value) {
            case 'lastWeek':
                range.start = new Date(tmpStart.valueOf() - (6*oneDay));
                range.group = 'lastWeek';
                break;
            case 'lastMonth': 
                range.start = new Date(tmpStart.setMonth(tmpStart.getMonth()-1));
                range.group = 'lastMonth';
                break;
            case 'lastHalfYear': 
                range.start = new Date(tmpStart.setMonth(tmpStart.getMonth()-6));
                range.group = 'lastHalfYear';
                break;
            case 'lastYear': 
                range.start = new Date(tmpStart.setMonth(tmpStart.getMonth()-12));
                range.group = 'lastYear';
                break;
        }
        // console.log(range);
        setTableRange({...tableRange, start: range.start, group: range.group});
        setPage(1);
    }

    return (
        <>
            <Head>
                <title>RA Group | Admin panel</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdminHeader/>
            <div id="admin">
                <div className="content">
                    <div className="semibold-32-48"><FormattedMessage id="admin.table.header" /></div>
                    <div className='filter'>
                        <div className='regular-16-20'>
                            <FormattedMessage id="admin.table.applications.count" values={{count: totalApplications}} />
                        </div>
                        <div className='dropdown'>
                            <button className='dropbtn regular-16-20'>{printRange()} </button>
                            <ul className='dropcontent'>
                                <li onMouseDown={changeTableRange} data-range="lastWeek">
                                    <FormattedMessage id="admin.table.filter.lastWeek"/>
                                </li>
                                <li onMouseDown={changeTableRange} data-range="lastMonth">
                                    <FormattedMessage id="admin.table.filter.lastMonth"/>
                                </li>
                                <li onMouseDown={changeTableRange} data-range="lastHalfYear">
                                    <FormattedMessage id="admin.table.filter.lastHalfYear"/>
                                </li>
                                <li onMouseDown={changeTableRange} data-range="lastYear">
                                    <FormattedMessage id="admin.table.filter.lastYear"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th><FormattedMessage id="admin.table.th.name" /></th>
                                <th><FormattedMessage id="admin.table.th.company" /></th>
                                <th><FormattedMessage id="admin.table.th.email" /></th>
                                <th><FormattedMessage id="admin.table.th.phone" /></th>
                                <th><FormattedMessage id="admin.table.th.platform" /></th>
                                <th><FormattedMessage id="admin.table.th.devtype" /></th>
                                <th><FormattedMessage id="admin.table.th.language" /></th>
                                <th><FormattedMessage id="admin.table.th.date" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications && applications.map((application, key) => (
                                <tr key={key}>
                                    <td className="number">{key+1}</td>
                                    <td>{application.name ? application.name : `${application?.firstname} ${application?.lastname$}` }</td>
                                    <td>{application?.companyName}</td>
                                    <td>
                                        <a href={`mailto:${application?.email}`}>
                                            {application?.email}
                                        </a>
                                    </td>
                                    <td>
                                        <a href={`tel:${application?.phone.replace(/ /g, '')}`}>
                                            {application?.phone}
                                        </a>
                                    </td>
                                    <td>
                                        <div className="os-container">
                                            {(application.platform && application.platform.length>0) ? (
                                                application.platform && application.platform.length>0 && application.platform.map((oss, j)=> (
                                                    <div key={j} className="os"><FormattedMessage id={`admin.table.data.os.${oss}`} /></div>
                                                ))
                                            ) : (
                                                application.os && application.os.length>0 && application.os.map((oss, j)=> (
                                                    <div key={j} className="os"><FormattedMessage id={`admin.table.data.os.${oss}`} /></div>
                                                ))
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                    {application.devtype ? (
                                        <FormattedMessage id={`admin.table.data.devtype.${application.devtype}`} />
                                    ) : (
                                        <FormattedMessage id={`admin.table.data.format.${application.format}`} />
                                    )}
                                    </td>

                                    <td>{language[application.lang]}</td>
                                    <td>{dateFormat(application.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                </div>
            </div>
        </>
    );
}