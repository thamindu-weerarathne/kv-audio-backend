import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function registerUser(req,res){

    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10)

    const newUser = new User(data)
    
    newUser.save().then(
        ()=>{
        res.json({
            message : "User connected successfully"
        })
    }).catch(
        (error)=>{
            res.status(500).json({
                error : "User registration failed" 
            })
    })
}

export function loginUser(req,res){

    const data = req.body;

    User.findOne({
        email : data.email
    }).then(
        (user)=>{

            if(user == null){
                res.status(404).json({
                    error : "User not found"  
                });
            }else{
                const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

                if (isPasswordCorrect){
                   const token = jwt.sign({
                    firstName : user.firstname,
                    lastName : user.lastname,
                    email : user.email,
                    role : user.role
                   },"kv-secret-89!") 

                    res.json({
                        message : "Login Successfully",token :token
                    });
                } else {
                    res.json({
                        message : "Login Failed"
                    });
                }
            }
            })
        }