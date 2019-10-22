var nls = require("../nls/strings");
var AuthModel = require("../model/auth-model");
var auth = new AuthModel();
/* 
    Middleware de Autenticação
    Verifica se toda requisição possui um token válido.
*/ 
module.exports = function (req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (auth.tokenIsValid(token) && req.path.indexOf("auth") != -1) throw new Error(nls.AuthenticationError);
    
    next()
};