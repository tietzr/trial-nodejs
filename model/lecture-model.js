class Lecture {
    constructor (_fullDesc, _name, _duration, _schedule=null){
        this.fullDesc = _fullDesc;
        this.name = _name;
        this.duration = _duration;
        this.schedule = _schedule;
    }

    getLectureDesc (){
        return this.schedule.replace(" ", "") + " " + this.fullDesc;
    }
}

module.exports = Lecture;