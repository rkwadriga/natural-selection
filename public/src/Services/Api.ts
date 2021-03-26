import { createContext, useContext } from "react"

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

export type Response = {
    isValid: boolean;
    status: number;
    data: {}|null;
    error: {
        message: string|null;
        code: number|null;
        context: {}|null;
    }|null;
};

type RequestInfo = {
    path: string;
    method: string;
};

export type PreHandler = (request: Request) => boolean;
export type PostHandler = (response: Response) => boolean;

class Api {
    HOME_PAGE = '/';
    LOGIN_PAGE = '/login';
    REGISTRATION_PAGE = '/registration';

    LOGIN_PATH = '/token';
    REGISTRATION_PATH = '/account';

    LOGIN_REQUEST: RequestInfo = {path: this.LOGIN_PATH, method: "PUT"};
    REGISTRATION_REQUEST: RequestInfo = {path: this.REGISTRATION_PATH, method: "PUT"};

    // @ts-ignore
    #config: ApiConfig;

    // @ts-ignore
    #beforeRequestHandler: PreHandler|null;

    // @ts-ignore
    #successHandler: PostHandler|null;

    // @ts-ignore
    #errorHandler: PostHandler|null;

    constructor() {
        this.#config = {baseUrl: this.HOME_PAGE};
        this.#beforeRequestHandler = (request: Request) => false;
        this.#successHandler = (response: Response) => false;
        this.#errorHandler = (response: Response) => false;
    }

    setConfig(config: ApiConfig): void {
        this.#config = config;
    }

    setBeforeRequestHandler(handler: PreHandler): void {
        this.#beforeRequestHandler = handler;
    }

    setErrorHandler(handler: PostHandler): void {
        this.#errorHandler = handler;
    }

    setSuccessHandler(handler: PostHandler): void {
        this.#successHandler = handler;
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
            isValid: false,
            status: 0,
            data: null,
            error: null,
        };

        return fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(request.params)
        }).then(resp => {
            response.status = resp.status;
            response.isValid = resp.status === 200;
            return resp.json();
        }).then(body => {
            if (response.isValid) {
                response.data = body;
                this.handleSuccess(response);
            } else {
                if (body.error === undefined) {
                    throw {
                        message: "Invalid response format",
                        code: null,
                        context: body,
                    }
                }
                response.error = body.error;
                this.handleError(response);
            }
            return response;
        }).catch(error => {
            this.prepareError(error);
            response.isValid = false;
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
        return {method: request.method, path: request.path, url: this.#config.baseUrl + request.path, params, headers};
    }

    handlePreRequest(request: Request): void {
        if (this.#beforeRequestHandler !== null) {
            this.#beforeRequestHandler(request);
        }
    }

    handleError(response: Response): void {
        if (this.#errorHandler !== null) {
            this.#errorHandler(response);
        }
    }

    handleSuccess(response: Response): void {
        if (this.#successHandler !== null) {
            this.#successHandler(response);
        }
    }
}

export const ApiContext = createContext<Api>(new Api());
export const useApi = () => useContext(ApiContext);