import nodemailer from 'nodemailer'
import Application from '../../database/models/application';
import connectMongo from '../../database/connect';

const applicationApi = async (req, res) => {
    if(req.method === 'POST'){
        const data = req.body;
        try {
            await connectMongo();
            
            const application = new Application(data);
            await application.save();
            console.log(application)
            const mailOptions = {
                from: process.env.EMAIL,
                to: process.env.EMAIL_TO,
                subject: `RA Group форма - ${application.name}`,
                html: `
                    <h2>${application.name}</h2>
                    ${application.platform.length > 0 && (
                        `<p>Платформы: 
                        ${application.platform.map((platform) => `${platform}`)
                        }</p>`)
                    }
                    <p>Услуга: ${application.devtype}</p>
                    ${application.companyName && `<p>Услуга: ${application.companyName}</p>`}
                    <p>Почта: ${application.email}</p>
                    <p>Номер телефона: ${application.phone}</p>  
                `,
            };
        
            let transporter = nodemailer.createTransport({
                port: 465,
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
                secure: true,
            });
            transporter.sendMail(mailOptions, (err, info)=>{
                if(err)
                    console.log(err);
                else
                    console.log(info)
            })

            return res.json();
        } catch (error) {
            console.log(error);
            return res.status(500).json();
        }
    }else if(req.method === 'GET'){
        const {page: pg, start, end} = req.query;
        const page = pg ? pg : 1;
        const limit = 20;
        const skip = limit * (page-1);
        if(!start || !end)
            return res.status(400).json({error: "Missing or invalid required parameter"});
        const startDate = new Date(start);
        const endDate = new Date(new Date(new Date(end).setUTCHours(0,0,0,0)).valueOf() + 1000*60*60*24);
        if(!(startDate instanceof Date && !isNaN(startDate)) || !(endDate instanceof Date && !isNaN(endDate)) ||  startDate >= endDate)
            return res.status(400).json({error: "Missing or invalid required parameter"});
            
        try {
            await connectMongo();

            const count = await Application.count({createdAt: {$gte: startDate, $lt: endDate}});

            const applications = await Application.find({createdAt: {$gte: startDate, $lt: endDate}}).skip(skip).limit(limit).sort('-createdAt');
            const totalPages = Math.ceil(count/limit);
            return res.json({applications, page, totalPages, limit, count});
        } catch (error) {
            console.log(error);
            return res.status(500).json();
        }
        // return res.json({message: "ok"})
    }else{
        return res.status(403).json();
    }
};

export default applicationApi;