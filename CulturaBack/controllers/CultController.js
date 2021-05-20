const cultDB = require("../models/Cults.js");
const cultService = require("../services/CultService.js");

class CultController {

    async save(req, resp){
        var cult = req.body;
        var response = await cultService.save(cult);
        var statusCode = response.status;
        resp.status(statusCode).json(response);
    }

    async getAll(req, resp){
        try{
            var result = await cultDB.find();
            resp.status(200).json(result);
        }
        catch{
            resp.status(500).json({status: 500, message: "error"});
        }
    }

}

module.exports = new CultController();