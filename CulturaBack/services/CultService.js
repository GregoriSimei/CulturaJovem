const cultDB = require("../models/Cults.js");

class CultService{

    async save(cult){
        const TYPE = "create";

        var validation = true;
        var response = {};

        // Check that the created in parameter is not filled
        var checkCreatedIn = cult.createdIn != null;
        if(checkCreatedIn){
            response = { 
                status: 400, 
                message: "Bad request"
            };

            return response;
        }

        // Check that the period parameter received is among the types expected
        var checkPeriod = await this.#checkPeriod(cult);
        if(!checkPeriod){
            validation = false;
            response = { 
                status: 400, 
                message: "Period is not valid"
            };
        }

        // Check that the date and period of cult dont exist
        // Case the period validation got a false response, the program will not check if the cult exist
        var cultExist = checkPeriod ? await this.#checkIfCultExist(cult) : false;
        if(cultExist){
            validation = false;
            response = { 
                status: 400, 
                message: "There is already a cult on this date and period"
            };
        }

        // If the request passes the validations, it will return a success messsage
        if(validation){
            this.#saveOrUpdate(cult, TYPE);
            response = { 
                status: 200, 
                message: "Success"
            };
        }
        
        return response;
    }

    async update(cult){
        const TYPE = "update";
        var id = cult.id;
        var response = {
            status: 400, 
            message: "Bad Request"
        };

        // Geting the actual state of cult
        var cultDb = await this.getById(id);
        var checkCult = cultDb ? true : false;

        // check that the period is right
        var checkPeriod = await this.#checkPeriod(cult);

        // check that cult was not deleted
        var checkDeleted = dbCult.deleted;

        // verify that all validations are right to do the update
        // after that, check if the update response has returned a modification
        if (checkCult && checkPeriod && !checkDeleted){
            var respUpdate = await this.#saveOrUpdate(cult, TYPE);
            var updated = respUpdate.nModified;
            
            response = updated > 1 ? 
            {
                status: 200, 
                message: "Success"
            } :
            {
                status: 400,
                message: "Server error"
            };
        }

        return response;
    }

    async getAll(){
        // Getting all the cults not deleted
        var cults = await cultDB.find({deleted: false});
        return cults;
    }

    async getById(id){
        // Getting cult by id
        var cult = await cultDB.findOne({_id : id, 
                                         deleted : false});
        return cult;
    }

    async #checkPeriod(cult){
        var period = cult.period;
        period = period.toLowerCase();

        var valid = period == "morning" || 
                    period == "evening";

        return valid;
    }

    async #checkIfCultExist(cult){
        var period = cult.period;
        var date = cult.date;

        var cult = await cultDB.findOne({ date: date, 
                                          period: period });

        var exist = cult ? true : false;
        return exist;
    }

    async #saveOrUpdate(cult, type){
        try{
            cult = type == "create" ? 
                    await cultDB.create(cult): 
                    await cultDB.updateOne({_id: cult.id}, {$set: cult});
        }
        catch{

        }

        return cult;
    }

}

module.exports = new CultService();