var AuthController = require("../controller/auth-controller");
var expect = require('chai').expect

describe('User.signIn', function () {
    var auth = new AuthController();
    it('Should sign in', function (done) {
        expect(auth.signIn("admin", "123")).not.throw;
        done();
    });

    it('Should throw an error', function (done) {
        expect(auth.signIn("outro", "123")).not.throw;
        done();
    });
});