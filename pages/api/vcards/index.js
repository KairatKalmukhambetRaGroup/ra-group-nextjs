import VCardModel from "../../../database/models/vcard";
import connectMongo from '../../../database/connect';

import { customAlphabet } from "nanoid";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


const vcardAPI = async (req, res) => {
    if(req.method === 'GET'){
        const {page: pg} = req.query;
        const page = pg ? pg : 1;
        const limit = 15;
        const skip = limit * (page-1);
        
        try {
            await connectMongo();
            
            await VCardModel.deleteMany({
                firstname: '-',
                createdAt: {$lte: new Date(Date.now() - 60 * 60 * 1000).toISOString()}
            });
            // 1 hour

            const count = await VCardModel.count();
            const vcards = await VCardModel.find({firstname: { $ne: '-'}}).select('firstname lastname link').skip(skip).limit(limit).sort('-createdAt');
            const totalPages = Math.ceil(count / limit);
            return res.json({vcards, page, totalPages, limit, count});
        } catch (error) {
            console.log(error);
            return res.status(500).json();
        }
    }else if(req.method === 'POST'){
        let exist = true;
        const nanoid = customAlphabet(characters, 8)
        let link = await nanoid();
        try {
            await connectMongo();
            while (exist) {
                console.log(link);
                const vc = await VCardModel.findOne({link})
                if(vc === null)
                    exist = false;
                else
                    link = await nanoid();
            }
            const vcard = new VCardModel({link, firstname: '-'});
            await vcard.save();
            return res.json(vcard);
        } catch (error) {
            console.log(error);
            return res.status(500).json();
        }
        
    }else if(req.method === 'PATCH'){
        const data = req.body;
        try {
            await connectMongo();
            const existintg = await VCardModel.findOne({link: data.link});
            if(!existintg)
                return res.status(404).json();
            const newVcard = await VCardModel.findByIdAndUpdate(existintg._id, data, {new: true});
            return res.json(newVcard);
        } catch (error) {
            console.log(error);
            return res.status(500).json();
        }
    }else{
        return res.status(403).json();
    }
}

export default vcardAPI;