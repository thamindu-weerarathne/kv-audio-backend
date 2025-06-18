import express from "express";
import { addInquiry, getInquiries } from "../controllers/inquiryController.js";

const inquiryRouter = express.Router();

inquiryRouter.post("/",addInquiry)
inquiryRouter.get("/",getInquiries)

export default inquiryRouter;