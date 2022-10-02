import Application from '../../database/models/application';
import connectMongo from '../../database/connect';

export default async (req, res) => {
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
        try {
            await connectMongo();
            const applications = await Application.find().sort('-createdAt');
            return res.json(applications);
        } catch (error) {
            console.log(error);
            return res.this.status(500).json();
        }
        // return res.json({message: "ok"})
    }else{
        console.log(error);
        return res.status(500).json();
    }
}