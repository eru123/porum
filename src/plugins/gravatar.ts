import crypto from "crypto-js";

const gravatar = (email: String,size:Number = 100) => {
    email = email.trim();
    email = email.toLowerCase();
    var hash = crypto.MD5(email);
    return "https://www.gravatar.com/avatar/" +hash+".jpg?s="+size;
};


export default gravatar;