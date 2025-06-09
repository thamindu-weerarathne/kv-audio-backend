import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "customer",
    },
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    profilePicture : {
        type : String,
        required : true,
        default : "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"
    }
});

const User = mongoose.model("User",userSchema);

export default User;
