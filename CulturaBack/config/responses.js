class Responses {

    async successResponse(message, data){
        return {
            status: 0,
            message: message,
            data: data
        }
    }

    async erroResponse(message, data){
        return {
            status: 1,
            message: message,
            data: data
        }
    }

    async badRequestResponse(message, data){
        return {
            status: 2,
            message: message,
            data: data
        }
    }
}

module.exports = new Responses();