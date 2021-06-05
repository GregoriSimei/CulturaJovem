const mongoose = require('mongoose');
const cultService = require('../../services/CultService');

describe('Test Cult Service', ()=>{

    beforeAll(async ()=>{
        await mongoose.connect('mongodb://localhost:27017/test', 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, 
            (err) => {
                if(err){
                    console.log(err);
                    process.exit(1);
                }
            }
        )
    })

    it('Create and Save Cult Successfully', async ()=>{
        const cult = {
            title: "Cult Tests",
            link : "www.teste.com.br",
            date : "2021-03-03",
            period : "morning"
        }

        var response = await cultService.save(cult);

        expect(response.status).toBe(200);
        expect(response.message).toBe("Success");
    })

    it('Unable to create a cult with an unlisted period', async ()=>{
        const cult = {
            title: "Cult Test",
            link: "www.teste.com.br",
            date: "2021-03-05",
            period: "not is morning or evening"
        }

        var response = await cultService.save(cult);

        expect(response.status).toBe(400);
        expect(response.message).toBe("Period is not valid");
    })

    afterAll(async ()=>{
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections){
            await collection.deleteOne();
        }
        await mongoose.disconnect();
    })
})