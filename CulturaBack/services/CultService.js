const cultDB = require("../models/Cults.js");

class CultService{

    async save(cult){
        var validation = true;
        var response = {};

        var newCultPeriod = cult.period;

        // Check that the period parameter received is among the types expected
        var checkPeriod = await this.#checkPeriod(newCultPeriod);
        if(!checkPeriod){
            validation = false;
            response = { status: 400, message: "Period is not valid"};
        }

        // Check that the date and period of cult dont exist
        // Case the period validation got a false response, the program will not check if the cult exist
        var cultExist = checkPeriod ? await this.#checkIfCultExist(cult) : false;
        if(cultExist){
            validation = false;
            response = { status: 400, message: "There is already a cult on this date and period"};
        }

        // If the request passes the validations, it will return a success messsage
        if(validation){
            this.#saveOrUpdate(cult, "create");
            response = { status: 200, message: "Success"};
        }
        
        return response;
    }

    async #checkPeriod(period){
        period = period.toLowerCase();
        var valid = period == "morning" || period == "evening" ? true : false;
        return valid;
    }

    async #checkIfCultExist(cult){
        
        var period = cult.period;
        var date = cult.date;

        var cult = await cultDB.findOne({ date: date, period: period});

        var exist = cult ? true : false;
        return exist;
    }

    async #saveOrUpdate(cult, type){
        try{
            cult = type == "create" ? await cultDB.create(cult): await cultDB.updateOne(cult);
        }
        catch{
            
        }

        return cult;
    }

}

module.exports = new CultService();