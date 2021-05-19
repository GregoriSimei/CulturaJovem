const { response } = require("express");
const cultDB = require("../models/Cults.js");

class CultService{

    async validateNewCult(cult){
        var validate = false;
        var response = cult;

        var newCultDate = cult.date;
        var newCultPeriod = cult.period

        var cults = await cultDB.find({date: newCultDate, period: newCultPeriod});

        if(cults){
            validate = false;
            response = { error: 505, message: "There is already a cult on this date and period"};
        }

        return [response, validate];
    }

}

module.exports = new CultService();