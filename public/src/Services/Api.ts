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

    // @ts-ignore
    #config: ApiConfig;

    // @ts-ignore
    #beforeRequestHandler: PreHandler|null;

    // @ts-ignore
    #successHandler: PostHandler|null;

    // @ts-ignore
    #errorHandler: PostHandler|null;

    constructor() {
        this.#config = {baseUrl: "/"};
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

    setSuccessHandler(handler: PostHandler): void {
        this.#errorHandler = handler;
    }

    setErrorHandler(handler: PostHandler): void {
        this.#successHandler = handler;
    }

    call(request: Request): Response {
        const response = {
            isValid: false,
            status: 500,
            data: {},
            error: {},
            errorContext: {},
        };
        return response;
    }

    get(url: string, params: {}, headers: {}): Response {
        return this.call(this.createRequest("GET", url, params, headers));
    }

    put(url: string, params: {}, headers: {}): Response {
        return this.call(this.createRequest("PUT", url, params, headers));
    }

    post(url: string, params: {}, headers: {}): Response {
        return this.call(this.createRequest("POST", url, params, headers));
    }

    delete(url: string, params: {}, headers: {}): Response {
        return this.call(this.createRequest("DELETE", url, params, headers));
    }

    createRequest(method: string, path: string, params: {}, headers: {}): Request {
        return {method, path, url: this.#config.baseUrl + path, params, headers};
    }
}

export const ApiContext = createContext<Api>(new Api());
export const useApi = () => useContext(ApiContext);