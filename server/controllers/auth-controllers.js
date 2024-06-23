const User = require("../Model/user-model");
const bcrypt = require("bcrypt");

const home = async( req,res)=>{
    try {
        res.status(200).send("Welcom to my world");
    } catch (error) {
        console.log(error);
    }
};


const register = async( req,res)=>{
    try {
        console.log(req.body);
        // const data=req.body;
        const {username,email,phone,password}=req.body;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"email alredy exist"});
        }

        const data = await User.create({username,email,phone,password});
        console.log(await data.generateToken());
        res.status(201).json({message:"Created succesfully",
            token: await data.generateToken(),
            userId: data._id.toString()
        });
    } catch (error) {
        console.log(error);
    }
};

const login = async(req,res)=>{
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
          return res.status(400).json({ message: "Invalid Email" });
        }
        const user = await userExist.compare(password);
        if(user){
            res.status(200).json({
                message:"LogIn Successfull",
                token: await userExist.generateToken(),
                userId:userExist._id.toString()
            })
        }else{
            res.status(400).json({
                message:"invalid email or password"
            })
        }
    } catch (error) {
        console.error(error)
    }
}

const user=async(req, res)=>{
    try {
        const userData = req.user;
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`Error from the user router ${error}`);
    }
}

module.exports= {home,register,login,user};