class Responses {

    async successResponse(data){
        return {
            status: 0,
            message: "Success",
            data: data
        }
    }

    async erroResponse(data){
        return {
            status: 1,
            message: "Server Error",
            data: data
        }
    }

    async badRequestResponse(data){
        return {
            status: 2,
            message: "Bad Request",
            data: data
        }
    }
}

module.exports = new Responses();