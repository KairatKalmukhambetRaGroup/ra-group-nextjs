import VCard from 'vcards-js';
import VCardModel from '../../../database/models/vcard';
import connectMongo from '../../../database/connect';


const api = async (req, res) => {
    const {link, type} = req.query;

    console.log(link, type)
    
    if(req.method === 'GET'){
        try {
            await connectMongo();

            const vcard = await VCardModel.findOne({link: link});

            if(type && type === 'edit'){
                return res.json(vcard);
            }else{

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