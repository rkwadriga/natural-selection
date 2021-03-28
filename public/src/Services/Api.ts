import { createContext, useContext } from "react"
import ApiException from "../Exceptions/ApiException";

export const SYSTEM_ERROR = 'SYSTEM_ERROR';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const NOT_UNIQUE_ERROR = 'NOT_UNIQUE_ERROR';

export const HOME_PAGE = '/';
export const LOGIN_PAGE = '/login';
export const REGISTRATION_PAGE = '/registration';

export const LOGIN_PATH = '/token';
export const REGISTRATION_PATH = '/account';

export const LOGIN_REQUEST = {path: LOGIN_PATH, method: "PUT"};
export const REGISTRATION_REQUEST = {path: REGISTRATION_PATH, method: "PUT"};

export type ApiConfig = {
    baseUrl: string;
};

export type Request = {
    method: string;
    path: string;
    url: string;
    params: {};
    headers: {};
};

export type ValidationErrorField = {
    value: string;
    error: string;
    code: number|string;
};
export type SystemError = {
    message: string|null;
    code: 'SYSTEM_ERROR'|null;
    context: {};
};
export type ValidationError = {
    message: string|null;
    code: 'VALIDATION_ERROR'|null;
    context: {fields:  Record<string, ValidationErrorField>};
};

export type Response = {
    isSuccess: boolean;
    status: number;
    data: {};
    error: SystemError|ValidationError;
};

type RequestInfo = {
    path: string;
    method: string;
};

export type PreHandler = (request: Request) => boolean;
export type PostHandler = (response: Response) => boolean;

class Api {
    private config: ApiConfig;

    private beforeRequestHandler: PreHandler|null;

    private successHandler: PostHandler|null;

    private errorHandler: PostHandler|null;

    constructor() {
        this.config = {baseUrl: HOME_PAGE};
        this.beforeRequestHandler = (request: Request) => false;
        this.successHandler = (response: Response) => false;
        this.errorHandler = (response: Response) => false;
    }

    setConfig(config: ApiConfig): void {
        this.config = config;
    }

    setBeforeRequestHandler(handler: PreHandler): void {
        this.beforeRequestHandler = handler;
    }

    setErrorHandler(handler: PostHandler): void {
        this.errorHandler = handler;
    }

    setSuccessHandler(handler: PostHandler): void {
        this.successHandler = handler;
    }

    call(request: RequestInfo, params = {}, headers = {}): Promise<Response> {
        return this.request(this.createRequest(request, params, headers))
    }

    get(path: string, params = {}, headers = {}): Promise<Response> {
        return this.call({path, method: "GET"}, params, headers);
    }

    put(path: string, params = {}, headers = {}): Promise<Response> {
        return this.call({path, method: "PUT"}, params, headers);
    }

    post(path: string, params = {}, headers = {}): Promise<Response> {
        return this.call({path, method: "POST"}, params, headers);
    }

    delete(path: string, params = {}, headers= {}): Promise<Response> {
        return this.call({path, method: "DELETE"}, params, headers);
    }

    request(request: Request): Promise<Response> {
        this.prepareHeaders(request.headers);
        this.handlePreRequest(request);

        let response = {
            isSuccess: false,
            status: 0,
            data: {},
            error: {message: null, code: null, context: {}},
        };

        return fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(request.params)
        }).then(resp => {
            response.status = resp.status;
            response.isSuccess = resp.status === 200;
            return resp.json();
        }).then(body => {
            if (response.isSuccess) {
                response.data = body;
                this.handleSuccess(response);
            } else {
                if (body.error === undefined) {
                    throw new ApiException("Invalid response format", 0, body);
                }
                response.error = body.error;
                this.handleError(response);
            }
            return response;
        }).catch(error => {
            this.prepareError(error);
            response.isSuccess = false;
            response.error = error;
            this.handleError(response);
            return response;
        });
    }

    prepareHeaders(headers: any): void {
        if (headers['Content-Type'] === undefined) {
            headers['Content-Type'] = 'application/json';
        }
    }

    prepareError(error: any) {
        if (typeof error === "string") {
            error = {
                message: error,
                code: 0,
                context: null,
            };
        }
        if (error.message === undefined) {
            error.message = JSON.stringify(error);
        }
        if (error.code === undefined) {
            error.code = 0;
        }
        if (error.context === undefined) {
            error.context = null;
        }
    }

    createRequest(request: RequestInfo, params: {}, headers: {}): Request {
        return {method: request.method, path: request.path, url: this.config.baseUrl + request.path, params, headers};
    }

    handlePreRequest(request: Request): void {
        if (this.beforeRequestHandler !== null) {
            this.beforeRequestHandler(request);
        }
    }

    handleError(response: Response): void {
        if (this.errorHandler !== null) {
            this.errorHandler(response);
        }
    }

    handleSuccess(response: Response): void {
        if (this.successHandler !== null) {
            this.successHandler(response);
        }
    }
}

const ApiContext = createContext<Api>(new Api());
export const useApi = () => useContext(ApiContext);