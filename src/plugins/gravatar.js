import crypto from "crypto-js";

const gravatar = (email,size= 100) => {
    email = typeof email == "string" ? email : "";
    email = email.trim();
    email = email.toLowerCase();
    var hash = crypto.MD5(email);
    return "https://www.gravatar.com/avatar/" +hash+".jpg?s="+size;
};


export default gravatar;