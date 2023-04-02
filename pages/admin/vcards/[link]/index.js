import axios from "axios";
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import QRCode from "qrcode-svg";
import AdminHeader from "../../../../components/AdminHeader";
import Pagination from "../../../../components/Pagination";
// import VCardStyle from "../../../../components/VcardStyle";

function downloadBlob(blob, filename) {
    const objectUrl = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
  }
  

const VCard = () => {
    const router = useRouter();
    const {link} = router.query;
    
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    async function fetchData(link) {
        const {data} = await axios.get(`/api/vcards/${link}?type=data&page=${page}`);
        console.log(data)
        setData(data.vcard);
        if(page !== data.page)
            setPage(data.page);
        setTotalPages(data.totalPages);
    }

    useEffect(()=>{
        if(link){
            fetchData(link);
        }
    },[link, page])

    useEffect(()=>{
        if(data){
            var qrcode = new QRCode({
                content: `ragroup.org/${data.link}`,
                container: "svg-viewbox", //Responsive use
                join: true //Crisp rendering and 4-5x reduced file size
            });
            document.getElementById('qr').innerHTML = qrcode.svg();


            // var svg = document.getElementById(`qr`);
            // var serializer = new XMLSerializer();
            // var source = serializer.serializeToString(svg);
            // if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            //     source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
            // }
            // if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
            //     source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
            // }

            // var name = data.lastname ? (data.firstname + " " + data.lastname) : data.firstname; 

            // source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
            // var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
            // document.getElementById(`download`).href = url;
            // document.getElementById(`download`).download = name;

        }
    },[data])

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h24', day: 'numeric' };
        return new Date(string).toLocaleDateString(router.locale,options);
    }

    const qrRef = useRef();

    const downloadQR = useCallback(()=>{
        if(data){
            var name = data.lastname ? (data.firstname + " " + data.lastname) : data.firstname; 
            const svg = qrRef.current.innerHTML;
            const blob = new Blob([svg], { type: "image/svg+xml" });
            downloadBlob(blob, `${name}.svg`);
        }
    }, [])

    return (
        <>
            <AdminHeader />
            <div id="vcard-data">
                {!data ? (
                    <div>
                        LOADING
                    </div>
                ) : (
                    <>
                        <div className="info-qr">
                            <div className="info">
                                <div className="info-row">Id<span>{data.link}</span></div>
                                <div className="info-row">Firstname<span>{data.firstname}</span></div>
                                <div className="info-row">Lastname<span>{data.lastname}</span></div>
                                <div className="info-row">Email<span>{data.email}</span></div>
                                <div className="info-row">Website<span><a href={data.website} target='_blank'>{data.website}</a></span></div>
                                <div className="info-row">Mobile<span>{data.mobile}</span></div>
                                <div className="info-row">Organization<span>{data.organization}</span></div>
                                <div className="info-row">Workplace<span>{data.workplace}</span></div>
                                <div className="info-row">Country<span>{data.country}</span></div>
                                <div className="info-row">City<span>{data.city}</span></div>
                            </div>
                            <div className="qr">
                                <div id="qr" ref={qrRef}></div>
                                <a id="download" onClick={downloadQR}>
                                Download <i></i>
                                </a>
                            </div>
                            {/* {data && 
                                <VCardStyle data={data} />
                            } */}
                        </div>
                    
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th>Browser</th>
                                    <th>Platform</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.scans && data.scans.length > 0 && data.scans.map((scan, key)=>(
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{scan.country}</td>
                                        <td>{scan.city}</td>
                                        <td>{scan.browser}</td>
                                        <td>{scan.platform}</td>
                                        <td>{formatDate(scan.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                    </>
                )}
            </div>
        </>
    );
}

export default VCard;