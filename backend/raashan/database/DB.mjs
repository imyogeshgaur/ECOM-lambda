import { connect } from "mongoose";

const connectToDB = async()=>{
    try {
       await connect(process.env.DB_URI);
       console.log("Connection Sucessfull !!!"); 
    } catch (error) {
        console.log("Error in connection to DB : ",error);
    }
}

export default connectToDB;