var config = require("../config/config");
var nls = require("../nls/strings");

class Auth {
    constructor (){
        this.token = null;
    }

    authenticate (user, password){
        if (user != config.auth.user || password != config.auth.password){  throw new Error(nls.UserAuthError);}

        this.token = config.auth.token;
        return this.token;
    }

    tokenIsValid (token){
        return token == config.auth.token;
    }
}

module.exports = Auth;