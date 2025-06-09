import express from "express";
import { addReview, approveReview, deletReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview)
reviewRouter.get("/",getReviews)
reviewRouter.delete("/:email",deletReview)
reviewRouter.put("/approve/:email",approveReview)

export default reviewRouter;