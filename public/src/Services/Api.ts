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
    data: {};
    error: {};
    errorContext: {};
};

export type PreHandler = (request: Request) => boolean;
export type PostHandler = (response: Response) => boolean;

class Api {
    HOME_PAGE = '/';
    LOGIN_PAGE = '/login';
    REGISTRATION_PAGE = '/registration';

    LOGIN_PATH = '/token';

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

    async call(request: Request): Promise<Response> {
        this.prepareHeaders(request.headers);

        this.handlePreRequest(request);

        const response = {
            isValid: false,
            status: 500,
            data: {value1: 1, value2: 2, value3: 3},
            error: {},
            errorContext: {},
        };

        const result = await fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(request.params)
        }).catch(error => {
            response.isValid = false;
            response.error = error;
        });

        return this.handleResponse(response, result);
    }

    async handleResponse(response: Response, result: any): Promise<Response> {
        let body = null;
        if (result !== undefined) {
            response.status = result.status;
            body = await result.json();
        }

        if (result.status === 200) {
            response.isValid = true;
            response.data = body;
        } else {
            response.isValid = false;
            if (body !== null) {
                if (body.error !== undefined) {
                    response.error = body.error.message;
                    response.errorContext = body.error.context;
                } else {
                    response.error = body;
                }
            }
        }

        if (response.isValid) {
            this.handleSuccess(response);
        } else {
            this.handleError(response);
        }

        return response;
    }

    prepareHeaders(headers: any): void {
        if (headers['Content-Type'] === undefined) {
            headers['Content-Type'] = 'application/json';
        }
    }

    async get(url: string, params = {}, headers = {}): Promise<Response> {
        return this.call(this.createRequest("GET", url, params, headers));
    }

    async put(url: string, params = {}, headers = {}): Promise<Response> {
        return this.call(this.createRequest("PUT", url, params, headers));
    }

    async post(url: string, params = {}, headers = {}): Promise<Response> {
        return this.call(this.createRequest("POST", url, params, headers));
    }

    async delete(url: string, params = {}, headers= {}): Promise<Response> {
        return this.call(this.createRequest("DELETE", url, params, headers));
    }

    createRequest(method: string, path: string, params: {}, headers: {}): Request {
        return {method, path, url: this.#config.baseUrl + path, params, headers};
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