import mongoose from "mongoose";

export const userScheme = new mongoose.Schema({
    name: {type: String, maxLength:[25, "Nam can not be more than 25 characters"]},
    email: {type: String, unique: true, required: true,
        match:[/.+\@.+\../,"Please enter a valid email"]//regular expressions as validators
    },
    password: {type: String,
        validate:{
            validator: function(value){
                return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
            },
            message:"Password should be between 8-12 characters and a special character"
        }
    },
    type: {type: String, enum:['Customer', 'Seller']}
})