

export interface IClientResponse {
    badRequest(response: any, message: string, payload: any) :any;
    unAuthorized(response: any, message: string) :any;
    forbidden(response: any, message: string) :any;
    notFound(response: any, message: string) :any;
    conflict(response: any, message: string) :any;
}

export interface IServerError {
    internalServerError(response: any, message: string, payload: any) :any;
}