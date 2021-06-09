const cultDB = require("../models/Cults.js");

class CultService{

    async save(cult){
        var [status, message] = cult.id != null ? 
            await this.update(cult):
            await this.create(cult);

        return [status, message];
    }

    async create(cult){
        // Check that the date and period of cult dont exist
        var cultExist = await this.checkIfCultExist(cult);

        var [status, message]= cultExist ? 
            await this.errorMessage(
                400,
                "There is a cult in this date and period"
            ) :
            await this.persistCult(cult);

        return [status, message];
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
        var checkPeriod = await this.checkPeriod(cult);

        // check that cult was not deleted
        var checkDeleted = dbCult.deleted;

        // verify that all validations are right to do the update
        // after that, check if the update response has returned a modification
        if (checkCult && checkPeriod && !checkDeleted){
            var respUpdate = await this.saveOrUpdate(cult, TYPE);
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

    async checkPeriod(cult){
        var period = cult.period;
        period = period.toLowerCase();

        var valid = period == "morning" || 
                    period == "evening";

        return valid;
    }

    async checkIfCultExist(cult){
        var period = cult.period;
        var date = cult.date;

        var exist = false;

        cult = await cultDB.findOne({ date: date, 
                                      period: period }).catch(() => (
                                          exist = true
                                      ));

        return exist;
    }

    async persistCult(cult){
        var status = 200;

        try{
            cult = cult.id == null ? 
                await cultDB.create(cult):
                await cultDB.updateOne({
                    _id: id
                });
        }
        catch(err) {
            console.log(err.errors);
            status = 400;
        }

        return [status, cult];
    }

    async errorMessage(status, message){
        return [
            status,
            {message : message}
        ];
    }
}

module.exports = new CultService();