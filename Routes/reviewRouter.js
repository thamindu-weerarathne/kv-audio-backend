import express from "express";
import { addReview, deletReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview)
reviewRouter.get("/",getReviews)
reviewRouter.delete("/:email",deletReview)


export default reviewRouter;