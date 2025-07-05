import { User } from "./models/Schemas.mjs";
import { hash, compare } from "bcryptjs";
import connectToDB from "./database/DB.mjs";
import jwt from "jsonwebtoken";

export const auth = async (event) => {

  if (event.routeKey === 'POST /auth/login') {
    try {
      const loginData = JSON.parse(event.body);
      const { emailOfUser, password } = loginData;
      connectToDB();
      const isUserExist = await User.findOne({ emailOfUser });
      if (isUserExist) {
        if (await compare(password, isUserExist.password)) {
          const token = jwt.sign({ userId:isUserExist._id }, "secret", { expiresIn: "1h" });
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: "User Logged In Sucessfully !!!",
              token
            }),
          }
        } else {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid Credentials !!!" }),
          }
        }
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Invalid Credentials !!!" }),
        }
      }
    } catch (error) {
      console.log("Error in login service : ", error);
    }
  }

  if (event.routeKey === 'POST /auth/register') {
    try {
      const registerData = JSON.parse(event.body);
      const { firstName, lastName, emailOfUser, password } = registerData;
      connectToDB();
      const isUserExist = await User.findOne({ emailOfUser });
      if (isUserExist) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "User Already Exist!!!" })
        }
      } else {
        const newPassword = await hash(password, 12);
        const newUser = await User.create({
          nameOfUser: {
            first: firstName,
            last: lastName
          },
          emailOfUser,
          password: newPassword
        });
        const data = await newUser.save();
        if (data) return {
          statusCode: 200,
          body: JSON.stringify({
            message: "User Registered Sucessfully !!!"
          })
        }
        else return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Something went wrong !!!"
          })
        }
      }
    } catch (error) {
      console.log("Error in register service : ", error);
    }
  }

  if (event.routeKey === 'POST /auth/forgetPassword') {
    try {
      const email = JSON.parse(event.body);
      connectToDB();
    } catch (error) {
      console.log("Error in forget password service : ", error);
    }
  }

  if (event.routeKey === 'POST /auth/resetPassword') {
    try {
      const resetPassData = JSON.parse(event.body);
      const { userId, password } = resetPassData;
      connectToDB();
    } catch (error) {
      console.log("Error in reset password service : ", error);
    }
  }
};