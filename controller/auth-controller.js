var Auth = require("../model/auth-model");

var auth = new Auth();

class AuthController {
    constructor (){
    }

    signIn (user, password) {
        return new Promise((resolve, reject) => {
            try {
                var token = auth.authenticate(user, password);
                resolve(token);
            }
            catch (error){
                reject(error.message);
            }
        });
    };

}

module.exports = AuthController;