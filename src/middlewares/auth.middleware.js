import { JsonWebTokenError, Jwt } from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const verifyJwtToken = asyncHandler(async(req, res, next) =>{
    try{
        const token = await req.cookie?.accessToken || 
         req.header("Authorization")?.replace("bearer","");

         if(!token){
               throw new ApiError(401,"Unauthorization request");
         }

        const decodeToken = Jwt.verify(token,process.env.ACCESS_TOKEN_SECERT)

        const user = await User.findById(decodeToken?._id).select(
            "-password -refreshToken"
        )

        if(!user){
            throw new ApiError(401,"Invalid Access token")
        }

        req.user = user;
        next();


    }catch(error){
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})