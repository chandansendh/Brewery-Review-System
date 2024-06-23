const validate = (schema)=> async(req,res,next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        // res.status(400).json({ msg: error.issues[0].message });
        const status =400;
        const message = error.issues[0].message;
        const err = {status,message};
        next(err);
        console.log(err);
    }
};

module.exports = validate;