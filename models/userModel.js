const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const validator = require("validator");
const { isLowercase } = require("validator");

//name, email , photo ,password

const userSchema = mongoose.Schema({
    name:{ 
        type:String,
        required:[true, "Please tell your name!"]
     },
    email:{
         type: String,
          required: [true, "Please provide your email"],
          unique:true,
          isLowercase:true,
          validator:[validator.isEmail, "Please provide a valid email"]

        },
    password:{
         type: String,
          required: [true, "Please provide your password"],
          minLength:8
        },
        confirmPassword:{
            type:String,
            required:[true, "Please  confirm  your password"],
            validate:  {
                
                validator: function(el) {
                return el === this.password;
            },
        
            message:"Password aren't same"
            }

        },
    pic: { 
        type : String
    }
})

//The work when the password modified
userSchema.pre("save", async function(next)  {
    if(!this.isModified("password")) return next();
     //Password hash with cost 12;
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
})



const User = mongoose.model("User", userSchema);

module.exports =  User ;
