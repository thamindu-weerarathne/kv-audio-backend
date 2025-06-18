import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js"

export async function addInquiry(req,res) {
    try{
        if(isItCustomer(req)){
            const data = req.body
            data.email = req.user.email
            data.phone = req.user.phone

            let id = 0;
            const inquiries = await Inquiry.find().sort({id:-1}).limit(1);
            if (inquiries.length == 0){
                id = 1;
            }else{
                id = inquiries[0].id + 1;
            }

            data.id = id;

            const newInquiry = new Inquiry(data);
            const response = await newInquiry.save();
            res.json({
                message : "Inquiry added successfully",
                id : response.id
            })     
        }

    }catch(e){
        res.json()
        res.status(500).json({
            message : "Failed to add inquiry"
        })
    }
}


export async function getInquiries(req,res) {
    try{
        if(isItCustomer(req)){
            const inquiries = await Inquiry.find({email:req.user.email});
            res.json(inquiries);
            return;
        }else if(isItAdmin(req)){
            const inquiries = await Inquiry.find();
            res.json(inquiries);
            return;
        }else{
            res.status(403).json({
                message : "Your are not authorized to perfome this"
            })
            return;
        }
    }catch(e){
        res.json()
        res.status(500).json({
            message : "Failed to add inquiry"
        })
    }
}
