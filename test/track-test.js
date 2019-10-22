var TrackController = require("../controller/track-controller");
var nls = require("../nls/strings");
var expect = require('chai').expect
const assert = require('assert');

var options = 
       [
        "Pair Programming vs Noise 45min",
        "Rails Magic 60min",
        "Ruby on Rails: Why We Should Move On 60min",
        "Clojure Ate Scala (on my project) 45min",
        "Programming in the Boondocks of Seattle 30min",
        "Ruby vs. Clojure for Back-End Development 30min",
        "Ruby on Rails Legacy App Maintenance 60min",
        "A World Without HackerNews 30min",
        "User Interface CSS in Rails Apps 30min",
        "Why Use Python lightning"
];

var track = new TrackController();

describe('Track.generate', function () {
    it('Should generate an empty value error', function (done) {
        var track = new TrackController();
        assert.throws(track.generateTracks.bind([]), nls.EmptyLectureList);
        done();
    });

    it('Should generate a incomplete data error', function (done) {
        var track = new TrackController();
        assert.throws(track.generateTracks.bind(["Pair Programming vs Noise"]), nls.LectureWhithoutDuration);
        done();
    });

    it('Should generate a list of tracks', function (done) {
        var result = track.generateTracks(["Pair Programming vs Noise 45min"]);
        expect(result).to.have.lengthOf(1);
        expect(result[0]).to.have.property("title");
        done();
    });
});

describe('Track. createLectureList', function () {
    it('Should load the lecture list from the option', function (done) {
        track.createLectureList(options);
        expect(track.lectureList).to.have.lengthOf(options.length);
        expect(track.lectureList[0]).to.have.property("duration", 60);
        expect(track.lectureList[options.length-1]).to.have.property("duration", 5);
        done();
    });

});

describe('Track. createTrackList', function () {
    it('Should create a list of empty tracks', function (done) {
        track.createLectureList(options);
        track.createTrackList();
        expect(track.trackList).to.have.lengthOf(1);
        expect(track.trackList[0]).to.have.property("title", "Track 1");
        expect(track.trackList[0].lectures).lengthOf(0);
        done();
    });
});