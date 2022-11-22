import VCard from 'vcards-js';

export default function handler(req, res) {
    if(req.method === 'GET'){
        const lastName = 'Kalmukhambet';
        const firstName = 'Kairat';
        const title = 'Developer';
        const email = 'kairat.kalmukhambet@ragroup.org';
        const organization = 'RA Group';
        const mobile = '87775825021';

        var vCard = VCard();
        vCard.firstName = firstName;
        vCard.lastName = lastName;
        vCard.title = title;
        vCard.email = email;
        vCard.organization = organization;
        vCard.mobile = mobile;
        vCard.workUrl='https://ragmirsot.com';


        res.setHeader('Content-Type', `text/vcard; name="${firstName}${lastName}.vcf"`);
        res.setHeader('Content-Disposition', `inline; filename="${firstName}${lastName}.vcf"`);

        return res.status(200).send(vCard.getFormattedString());
        // return res.status(200).json({message: "true"});
    }else{
        return res.status(404).json();
    }
}