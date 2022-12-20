import VCard from 'vcards-js';
import VCardModel from '../../../database/models/vcard';
import Scan from '../../../database/models/scan';
import connectMongo from '../../../database/connect';
import axios from 'axios';
import { useUserAgent } from 'next-useragent'

const APIKEY = 'bddaf311001242b39227cc573128e7ca';
async function getIP(){
    const {data} = await axios.get('https://api.ipify.org?format=json');
    // console.log(data.ip);
    return data.ip;
}

async function getGeo(ip){
    const {data} = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${APIKEY}&ip_address=${ip}`)
    return data;
}




const api = async (req, res) => {
    const {link, type} = req.query;
    
    if(req.method === 'GET'){
        try {
            await connectMongo();

            const vcard = await VCardModel.findOne({link: link});

            if(type && type === 'edit'){
                return res.json(vcard);
            }
            else if(type && type === 'data'){
                const vCard = await VCardModel.findById(vcard._id).populate('scans');
                return res.json(vCard);
            }
            else{

                // IP
                const ip = await getIP();
                if(ip){
                    const geoData = await getGeo(ip);
                    // console.log(geoData);
                    if(geoData && geoData.country){
                        const st = req.headers['user-agent']
                        const ua = useUserAgent(st)
                        const browser = ua.browser + ' ' + ua.browserVersion;
                        const platform = ua.os + ' ' + ua.osVersion;


                        const scan = new Scan({ip: ip, country: geoData.country, city: geoData.city, browser, platform});
                        await scan.save();

                        await VCardModel.findByIdAndUpdate(vcard._id, {$push: {scans: scan._id}});
                    }
                }



                var vCard = VCard();
                vCard.firstName = vcard.firstname;
                vCard.lastName = vcard.lastname;
                vCard.email = vcard.email;
                vCard.workUrl=vcard.website;
                vCard.mobile = vcard.mobile;
                vCard.organization = vcard.organization;
                vCard.title = vcard.workplace;
                vCard.country = vcard.country;
                vCard.city = vcard.city;

                res.setHeader('Content-Type', `text/vcard; name="${vcard.firstname}${vcard.lastname}.vcf"`);
                res.setHeader('Content-Disposition', `attachment; filename="${vcard.firstname}${vcard.lastname}.vcf"`);
        
                return res.status(200).send(vCard.getFormattedString());
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json();
        }


    }else{
        return res.status(404).json();
    }
}

export default api;