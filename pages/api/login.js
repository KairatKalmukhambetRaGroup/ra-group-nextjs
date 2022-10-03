export default async (req, res) => {
    if(req.method === 'POST'){
        const data = req.body;
        return res.json(data);
    }else{
        return res.status(403).json();
    }
};
