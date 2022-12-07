import { useRouter } from "next/router";
import Link from "next/link";
import QRCode from "qrcode-svg";
import { useEffect } from "react";

const VCardItem = ({vcard}) => {
    const {locale} = useRouter();

    var qrcode = new QRCode({
        content: `ragroup.org/${vcard.link}`,
        container: "svg-viewbox", //Responsive use
        join: true //Crisp rendering and 4-5x reduced file size
    });
    useEffect(()=>{
        if(qrcode){
            document.getElementById(`qr-${vcard.link}`).innerHTML = qrcode.svg();
            var svg = document.getElementById(`qr-${vcard.link}`);
            var serializer = new XMLSerializer();
            var source = serializer.serializeToString(svg);
            if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
                source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
                source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
            }

            var name = vcard.lastname ? (vcard.firstname + " " + vcard.lastname) : vcard.firstname; 

            source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
            var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
            document.getElementById(`save-${vcard.link}`).href = url;
            document.getElementById(`save-${vcard.link}`).download = name;
        }
    }, qrcode)
    return (
        <div className="vcard-item">
            <div className="qr">             
                <div id={`qr-${vcard.link}`}></div>
            </div>
            <div className="vcard-body">
                <Link href={`/${locale}/admin/vcards/${vcard.link}`}>
                    <div>
                        {vcard.firstname} {vcard.lastname}
                    </div>
                </Link>
            </div>
            <div className="vcard-footer">
                <a className="download" id={`save-${vcard.link}`} download>
                    <i></i>
                </a>
                <div className="stat"><i></i></div>
                <Link href={`/${locale}/admin/vcards/${vcard.link}/edit`}>
                    <div className="edit"><i></i></div>
                </Link>
            </div>
        </div>
    )
};

export default VCardItem;