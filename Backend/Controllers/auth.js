import express from 'express';
import bcryptjs from 'bcryptjs';
import User from '../Models/User.js';

const router = express.Router(); 


/*router.post('/signup', async (req, res) => { 
const { username, email, password } = req.body; 
const hashedPassword = await bcrypt.hash(password, 10); 
const newUser = new User({ username, email, password: hashedPassword 
}); 
await newUser.save(); 
res.status(201).json({ message: 'User created successfully' }); 
}); 
module.exports = router;*/

export const signup = async(req,res)=>{
    try {
        const{username, email,password} = req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message : "User Already Exist !"})
        }
        const EncryptedPassword = await bcryptjs.hash(password,10);
        const NewUser = new User({
         username: username,
           email: email,
           password: EncryptedPassword,
        })
       await NewUser.save()
        res.status(201).json({message: "User registered sucessfully",user:{
            _id: NewUser._id,
            username: NewUser.username,
            email: NewUser.email,
        }});
    } 
    catch (error) {
        console.log("Error : " + error.message);
        res.status(500).json({message :"Internal server error dectected !"})
    }
};

/* router.post('/login', async (req, res) => { 
const { email, password } = req.body; 
const user = await User.findOne({ email }); 
if (!user || !(await bcrypt.compare(password, user.password))) { 
return res.status(401).json({ message: 'Invalid credentials' }); 
} 
res.status(200).json({ message: 'Login successful', user }); 
}); */

export const signin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch || !user){
            return res.status(400).json({message: "Invalid username or password"});
        }
        else{
            res.status(200).json({
                message: "Login Sucessfully",
                user :{
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
        }
        
    } catch (error) {
     console.error("Error: "+ error);
     return res.status(500).json({message: "Internal server error detected !"})   
    }
};