import User from '../../database/models/user';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongo from '../../database/connect';

const loginApi = async (req, res) => {
    if(req.method === 'POST'){
        const {email, password, remember} = req.body;
        try {
            await connectMongo();
        
            const existingUser = await User.findOne({email});
            if(!existingUser)
                return res.status(404).json({error: "User does not exist."});
            
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if(!isPasswordCorrect)
                return res.status(401).json({error: "Invalid credentials."});
            
            let expireTime = "6h";
            if(remember)
                expireTime = "30d";
            const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.TOKEN_KEY, {expiresIn: expireTime});
                
            return res.status(200).json({user: existingUser, token});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Something went wrong."});
        }
    }else{
        return res.status(403).json();
    }
};
export default loginApi;