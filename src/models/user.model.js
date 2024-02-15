import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username : {
        type: String,
        required : true,
        unique: true,
        trim: true,
        lowecase: true,
        index: true
    },
    email : {
        type: String,
        required : true,
        unique: true,
        trim: true,
        lowecase: true,
    },
    fullName : {
        type: String,
        required : true,
        trim: true,
        index: true
    },
    avatar : {
        type: String, // cloudnary url
        required : true,
    },
    coverImage : {
        type: String, // cloudnary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password : {
        type : String,
        required: [true,"Password is required"]
    },
    refreshToken : {
        type: String
    },
    },{
        timestamps: true
    }
)


//  encrypt message if we modify the password or first time save the user
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10);
    next()
})

// compare user password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken =  function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECERT,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefereshToken = async function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFERESH_TOKEN_SECERT,
    {
        expiresIn: process.env.REFERESH_TOKEN_EXPIR
    }
    )
}



export const User = mongoose.model("User",userSchema);