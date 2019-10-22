var Utils = require("../utils");
var expect = require('chai').expect

describe('Utils.getLectureTime', function () {
    var utils = new Utils();
    it('Should be 60', function (done) {
        expect(utils.getLectureTime(" 60min")).to.be.equal(60);
        done();
    });
    it('Should be 5 when passing lightning', function (done) {
        expect(utils.getLectureTime(" lightning")).to.be.equal(5);
        done();
    });
});

describe('Utils.getTimeDiference', function () {
    var utils = new Utils();
    var time1 = "09:30 AM", time2 = "10:00 AM";
    it('Should be 30 minutes', function (done) {
        expect(utils.getTimeDiference(time1, time2)).to.be.equal(30);
        done();
    });
});

describe('Utils.addMinutesToDate', function () {
    var utils = new Utils();
    var date = new Date("01/01/2019 10:00 AM");
    it('Should be 10:32 minutes', function (done) {
        var result = utils.addMinutesToDate(date, 32);
        expect(result.getHours()).to.be.equal(10);
        expect(result.getMinutes()).to.be.equal(32);
        done();
    });

    it('Should be 11:40 minutes', function (done) {
        var result = utils.addMinutesToDate(date, 100);
        expect(result.getHours()).to.be.equal(11);
        expect(result.getMinutes()).to.be.equal(40);
        done();
    });
});