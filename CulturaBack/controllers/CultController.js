const cultDB = require("../models/Cults.js");
const cultService = require("../services/CultService.js");

class CultController {

    async save(req, resp){
        var cult = req.body;
        var [status, response] = await cultService.save(cult);
        resp.status(status).json(response);
    }

    async update(req, resp){
        var cult = req.body;
        var response = {status: 400, message: "Bad Request"};

        response = await cultService.update(cult);

        resp.status(200).json(response);
    }

    async getCult(req, resp){
        var idCult = req.query.id;
        var response = idCult ? 
                    await cultService.getById(idCult) :
                    await cultService.getAll();

        resp.status(200).json(response);
    }

}

module.exports = new CultController();