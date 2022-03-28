import { Response } from "express";
import { IClientResponse, IServerError } from "./IErrorResponse";


function jsonGenerator(message: string, status: number, payload: any = null) {
    return { msg: message, status_code: status, payload: payload }
}


class ClientError implements IClientResponse {
    badRequest(response: Response, message: string | null = null, payload: any = null) {
        return response.json(jsonGenerator(`Bad request - ${message}`, 400, payload));
    }
    unAuthorized(response: Response, message: string = "") {
        return response.json(jsonGenerator(`UnAuthorized - ${message}`, 401));
    }
    forbidden(response: Response, message: string = "") {
        return response.json(jsonGenerator(`Forbidden - ${message}`, 403));
    }
    notFound(response: Response, message: string = "") {
        return response.json(jsonGenerator(`Not Found - ${message}`, 404));
    }
    conflict(response: Response, message: string = "") {
        return response.json(jsonGenerator(`Confilct - ${message}`, 409));
    }
}

class ServerError implements IServerError {
    internalServerError(response: any, message: string = "", payload: any = null) {
        return response.json(jsonGenerator(`Internal Server Error - ${message}`, 500, {error: payload}));
    }
}


class ErrorResponse {
    client = new ClientError();
    server = new ServerError();
}

export default new ErrorResponse();