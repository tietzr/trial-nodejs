var Lecture = require("../model/lecture-model");
var Utils = require("../utils");
var config = require("../config/config");
var Track = require("../model/track-model");
var nls = require("../nls/strings");

var utils = new Utils();

class TrackController {
    constructor() {
        this.trackList = [];
        this.lectureList = [];
        this.totalMorningTime = null;
        this.totalAfternoonTime = null;
    }

    /*  
        Recupera e cria a lista com dados para organização das palestras.
        Gera uma lista de palestras ordenando pelo tempo de cada uma, da maior duração para a menor.
    */
    createLectureList(options) {
        var regex = new RegExp(config.regex);

        if (options.some(item => !regex.test(item))) { throw (new Error(nls.LectureWhithoutDuration)); }

        this.lectureList = options.map(item => {
            var lectureTime = utils.getLectureTime(regex.exec(item).shift());
            return new Lecture(item, item.replace(regex, ""), lectureTime);
        });

        this.lectureList = this.lectureList.sort(utils.dynamicSort("-duration"));
    }

    /*  
        Cria a lista de Tracks com a quantidade necessária para a distribuição de todas as palestras
    */
    createTrackList() {
        var totalLectureTime = this.lectureList.reduce((a, b) => { return a + b.duration }, 0);
        this.totalMorningTime = utils.getTimeDiference(config.startTime, config.lunchTime);
        this.totalAfternoonTime = utils.getTimeDiference(config.lunchReturnTime, config.maxEndingTime);

        var numTracks = Math.ceil(totalLectureTime / (this.totalMorningTime + this.totalAfternoonTime));
        this.trackList = Array.from({ length: numTracks }, (e, index) => { return new Track(config.trackBaseName + (index + 1), []) });
    }

    /*  
        Distribui a lista de palestras nas tracks de acordo com a quantidade de tempo disponível.
    */
    addLecturesToTrack(timeAvailable) {
        this.trackList.forEach(track => {
            var sum = 0;
            var index = 0;
            while (index < this.lectureList.length && sum < timeAvailable) {
                if (sum + this.lectureList[index].duration <= timeAvailable) {
                    let lecture = this.lectureList.splice(index, 1).shift();
                    sum += lecture.duration;
                    track.lectures.push(lecture);
                } else {
                    index++;
                }
            }
        });
    }

    /*  
        Pra cada track, adiciona uma atividade extra, no fim da lista de palestras.
    */
    addExtraActivity(lecture) {
        this.trackList.forEach(track => track.lectures.push(lecture));
    }

    /*
        Verifica a lista de Tracks e suas palestras para encontrar qual o último horário.
        O horário mínimo do network event é retornado caso as palestras não ocupem os horários necessários.
    */
    getLastScheduleTime() {
        var lastSchedules = this.trackList.map(track => utils.getLectureScheduleTime(track.lectures[track.lectures.length - 1].schedule,
            track.lectures[track.lectures.length - 1].duration));
        var happyHourTime = lastSchedules.reduce(utils.compareTimesFunction);
        if (happyHourTime < config.minEndingTime) {
            happyHourTime = config.minEndingTime;
        }
        return happyHourTime;
    }

    /*
        Para todas as palestras distribuídas, gera o respectivo horário formatado
        levando em conta a duração e os horário da palestra anterior
    */
    generateSchedule() {
        this.trackList.forEach(track => {
            var startTime = config.startTime;
            var index = 0, duration = 0;

            do {
                let schedule = track.lectures[index].schedule;
                if (schedule == null) {
                    schedule = utils.getLectureScheduleTime(startTime, duration);
                }
                track.lectures[index].schedule = schedule;
                startTime = schedule;
                duration = track.lectures[index].duration;

                index++;
            } while (index < track.lectures.length)
        });
    }

    /*
        Lógica com os passos para criação das Tracks.
        Retorna uma lista de conforme especificação de listagem
    */
    generateTracks(options) {
        if (options.length == 0) throw new Error(nls.EmptyLectureList);
        try {
            this.createLectureList(options);

            this.createTrackList();

            this.addLecturesToTrack(this.totalMorningTime);

            var lunchLecture = new Lecture(config.lunchEventName, config.lunchEventName, 60, config.lunchTime);

            this.addExtraActivity(lunchLecture);

            this.addLecturesToTrack(this.totalAfternoonTime);

            this.generateSchedule();

            var networkEventLecture = new Lecture(config.networkEventName, config.networkEventName, 0, this.getLastScheduleTime())
            this.addExtraActivity(networkEventLecture);

            return this.trackList.map(track => { return { title: track.title, data: track.lectures.map(lecture => lecture.getLectureDesc()) } });
        } catch (error) {
            throw new Error(nls.InternalError + error.message);
        }

    };

}

module.exports = TrackController;