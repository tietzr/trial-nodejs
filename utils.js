var config = require("./config/config");
var nls = require("./nls/strings");

class Utils {
    constructor (){

    }

    // Recupera o valor inteiro correspondente à quantidade de minutos de um texto
    getLectureTime(value) {
        if(value.indexOf(config.lightningWord) != -1){
            return config.lightningTime;
        }
        var regex = /\d+/;
        return Number(regex.exec(value).slice());
    }

    // Retorna a diferença em minutos entre dois horários em formato texto
    getTimeDiference(startTime, endTime){
        var start = new Date(config.defaultStringDate + startTime);
        var end = new Date(config.defaultStringDate + endTime);

        var difference = end.getTime() - start.getTime();

        return Math.round((difference / 1000) / 60);
    }

    // Adiciona minutos a uma data 
    addMinutesToDate(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }

    // Formata as string de data pra retornar apenas informações de hora
    // Formato de saída HH:mm AM/PM
    formatTime (dateToFormat){
        if (!dateToFormat instanceof Date ) throw new TypeError(nls.InvalidTypeError);
        var re = /:\d\d\s/;
        var formatterList = dateToFormat.toLocaleTimeString().replace(re, " ").split(":");
        formatterList[0] = formatterList[0].padStart(2, "0");
        return formatterList.join(":");
    }

    // Calcula o horário de uma palestra baseado no tempo inicial na duração
    // Retorna um texto formatado com o horário.
    getLectureScheduleTime(startTimeString, valueToAdd) {
        var start = new Date(config.defaultStringDate + startTimeString);
        
        var newTime = this.addMinutesToDate(start, valueToAdd);

        return this.formatTime(newTime);
    }

    ////// Funções auxiliares

    // Ordena um array de objetos baseado em uma propriedade
    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    // Compara strings de Hora e retorna qual delas é a maior em termos de horário
    compareTimesFunction (a, b){
        return (new Date(config.defaultStringDate + a)).getTime() > 
            (new Date(config.defaultStringDate + b)).getTime()
            ? a : b;
    }
}

module.exports = Utils;