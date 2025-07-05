exports.auth = async (event) => {
  if(event.routeKey==='POST /auth/login'){
    try {
        const loginData = JSON.parse(event.body);
        const {email, password} = loginData;

    } catch (error) {
      console.log("Error in login service : ",error);
    }
  }

  if(event.routeKey === 'POST /auth/register'){
    try {
        const registerData = JSON.parse(event.body);
        const {firstName, lastName, email, password} = registerData;
        
    } catch (error) {
      console.log("Error in register service : ",error);
    }
  }
  if(event.routeKey === 'POST /auth/forgetPassword'){
    try {
        const email = JSON.parse(event.body);

    } catch (error) {
      console.log("Error in forget password service : ",error);
    }
  }
  if(event.routeKey === 'POST /auth/resetPassword'){
    try {
        const resetPassData = JSON.parse(event.body);
        const {userId,password} = resetPassData;

    } catch (error) {
      console.log("Error in reset password service : ",error);
    }
  }
};

exports.user = async (event) => {
  if(event.routeKey==='GET /user/getAll'){
    return "user api"
  }
};