import mongoose ,{Schema} from "mongoose";
import jwt from"jsonwebtoken"
import bcrypt from "bcrypt"
const UserSchema=new Schema(
    {
        user:{
            type:String,
            required:true,
            unique:true,
            lowecase:true,
            trim:true,
            index:true

        },
         email:{
            type:String,
            required:true,
            unique:true,
            lowecase:true,
            trim:true,
            

        },
         fullname:{
            type:String,
            required:true,
            unique:true,
            lowecase:true,
            trim:true,
            index:true

        },
        avatar:{
            type:String,//cloudinary url
            required:true,


        },
        coverImage:{
            type:String,
            

        },
        watchHistory:
        [{
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ],
    password:{
        type:String,
        required:[true,"password is required "]

    },
    refreshToken:{
        type:String
    }



},
{
    timestamps:true
}

)
UserSchema.pre("save", async function(next)
{if(this.isModified("password"))return next()
    

    this.password=bcrypt.hash(this.password,10)
    next()

})
UserSchema.methods.isPasswordCorrect=async function(password) {
   return await bcrypt.compare(password,this.password)
    
}
UserSchema.methodsAccessToken=function() {
    return jwt.sign({userId:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname
    },process.env.JWT_ACCESS_TOKEN_SECRET,{expiresIn:"1d"})
}
UserSchema.methodsRefreshToken=function() {
    return jwt.sign({userId:this._id,},process.env.JWT_REFRESH_TOKEN_SECRET,{expiresIn:"10d"})
}
export const User =mongoose.model("User",UserSchema)