const { response } = require("express");
const cultDB = require("../models/Cults.js");

class CultService{

    async validateNewCult(cult){
        var validation = false;
        var response = cult;

        var newCultDate = cult.date;
        var newCultPeriod = cult.period;

        var checkPeriod = await this.#checkPeriod(newCultPeriod);
        if(!checkPeriod){
            response = { error: 400, message: "Period is not valid"};
            return [response, validation];
        }

        var cults = await cultDB.find({date: newCultDate, period: newCultPeriod});

        if(cults){
            validation = true;
            response = { error: 400, message: "There is already a cult on this date and period"};
            console.log("")
            return [response, validation];
        }

        response = { error: 505, message: "Server error: contact your system administrator"};
        return [response, validation];
    }

    async #checkPeriod(period){
        period = period.toLowerCase();
        var exist = period == "morning" || period == "evening" ? true : false;
        return exist;
    }

}

module.exports = new CultService();