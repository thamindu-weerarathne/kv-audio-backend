import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js"

export async function addInquiry(req, res) {
    try {
        if (isItCustomer(req)) {
            const data = req.body
            data.email = req.user.email
            data.phone = req.user.phone

            let id = 0;
            const inquiries = await Inquiry.find().sort({ id: -1 }).limit(1);
            if (inquiries.length == 0) {
                id = 1;
            } else {
                id = inquiries[0].id + 1;
            }

            data.id = id;

            const newInquiry = new Inquiry(data);
            const response = await newInquiry.save();
            res.json({
                message: "Inquiry added successfully",
                id: response.id
            })
        }

    } catch (e) {
        res.json()
        res.status(500).json({
            message: "Failed to add inquiry"
        })
    }
}


export async function getInquiries(req, res) {
    try {
        if (isItCustomer(req)) {
            const inquiries = await Inquiry.find({ email: req.user.email });
            res.json(inquiries);
            return;
        } else if (isItAdmin(req)) {
            const inquiries = await Inquiry.find();
            res.json(inquiries);
            return;
        } else {
            res.status(403).json({
                message: "Your are not authorized to perfome this"
            })
            return;
        }
    } catch (e) {
        res.json()
        res.status(500).json({
            message: "Failed to add inquiry"
        })
    }
}

export async function deleteInquiry(req, res) {
    try {
        if (isItAdmin(req)) {
            const id = req.params.id;

            await Inquiry.deleteOne({ id: id })
            res.json({
                message: "Inquiry deleted successfully"
            })
            return;
        } else if (isItCustomer(req)) {
            const id = req.params.id;

            const inquiry = await Inquiry.findOne({ id: id });
            if (inquiry == null) {
                res.status(404).json({
                    message: "Inquiry not found"
                })
                return;
            } else {
                if (inquiry.email == req.user.email) {
                    await Inquiry.deleteOne({ id: id })
                    res.json({
                        message: "Inquiry deleted successfully"
                    })
                    return;
                } else {
                    res.status(403).json({
                        message: "You are not authorized to perfom this action"
                    })
                    return;
                }
            }
        } else {
            res.status(403).json({
                message: "You are not authorized to perfom this action"
            })
            return;
        }
    } catch (e) {
        res.json({
            message: "Failed to delete inquiry"
        })
    }

}

export async function updateInquiry(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;

        if (isItAdmin(req)) {
            await Inquiry.updateOne({ id }, data);
            return res.status(200).json({ message: "Inquiry updated successfully" });

        } else if (isItCustomer(req)) {
            const inquiry = await Inquiry.findOne({ id });

            if (!inquiry) {
                return res.status(404).json({ message: "Inquiry not found" });
            }

            if (inquiry.email !== req.user.email) {
                return res.status(403).json({ message: "You are not authorized to perform this action" });
            }

            // Allow only certain fields for customer
            const updateData = {};
            if (data.message) updateData.message = data.message;

            await Inquiry.updateOne({ id }, updateData);
            return res.status(200).json({ message: "Inquiry updated successfully" });

        } else {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }

    } catch (error) {
        console.error("Update Inquiry Error:", error);
        return res.status(500).json({ message: "Failed to update inquiry" });
    }
}