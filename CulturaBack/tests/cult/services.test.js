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
    });

    it('Create and Save Cult Successfully', async ()=>{
        const cult = {
            title: "Cult Tests 2",
            link : "www.teste.com.br",
            date : "2021-03-03",
            period : "morning",
            deleted : false
        }

        var response = await cultService.save(cult);

        expect(response.status).toBe(200);
        expect(response.message).toBe("Success");
    });

    afterAll(async ()=>{
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections){
            await collection.deleteOne();
        }
        await mongoose.disconnect();
    })
})