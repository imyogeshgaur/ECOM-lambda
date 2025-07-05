import {Schema, model} from "mongoose"

const userSchema = new Schema({
    nameOfUser:{
        first:String,
        last:String
    },
    emailOfUser:{
        type:String,
        required:true,
        unqiue:true
    },
    password:{
        type:String,
        required:true
    },
    addrerss:{
        line1:String,
        line2:String,
        city:String,
        state:String,
        zip:String
    }    
})

const productSchema = new Schema({
    product:{
        category:{
            type:String,
            required:true
        },
        nameOfProduct:{
            type:String,
            required:true,
            unique:true
        },
        priceOfProduct:{
            type:String,
            required:true,
        },
        quantityOfProduct:{
            type: String,
            required: true
        }
    }
})

export const User = model("User",userSchema);

