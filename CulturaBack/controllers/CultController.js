const cultDB = require("../models/Cults.js");
const cultService = require("../services/CultService.js");

class CultController {

    async save(req, resp){
        var cult = req.body;

        try{
            var response = await cultService.save(cult);
            var statusCode = response.status;
        }
        catch{
            var [statusCode, response] = [400, {status: 400, message: "Bad request"}];
        }

        resp.status(statusCode).json(response);
    }

    async update(req, resp){
        var cult = req.body;
        var response = await cultService.update(cult);
        resp.status(200).json({status: 200, message: "Route working"});
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