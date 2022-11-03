import Application from '../../database/models/application';
import connectMongo from '../../database/connect';

const applicationApi = async (req, res) => {
    if(req.method === 'POST'){
        const data = req.body;
        try {
            await connectMongo();
            
            const application = new Application(data);
            await application.save();
        
            return res.json();
        } catch (error) {
            console.log(error);
            return res.status(500).json();
        }
    }else if(req.method === 'GET'){
        const {page: pg, start, end} = req.query;
        const page = pg ? pg : 1;
        const limit = 15;
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