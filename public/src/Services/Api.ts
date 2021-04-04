import { createContext, useContext } from "react"
import ApiException from "../Exceptions/ApiException";
import {User} from "./User";

export const SYSTEM_ERROR = 'SYSTEM_ERROR';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const NOT_UNIQUE_ERROR = 'NOT_UNIQUE_ERROR';

export const HOME_PAGE = '/';
export const LOGIN_PAGE = '/login';
export const REGISTRATION_PAGE = '/registration';
export const ECOSYSTEMS_PAGE = '/ecosystems';

export const LOGIN_PATH = '/token';
export const REGISTRATION_PATH = '/account';
export const ACCOUNT_PATH = "/account";
export const ECOSYSTEMS_PATH = '/ecosystems';

export const LOGIN_REQUEST = {path: LOGIN_PATH, method: "PUT"};
export const LOGOUT_REQUEST = {path: LOGIN_PATH, method: "DELETE"};
export const REFRESH_TOKEN_REQUEST = {path: LOGIN_PATH, method: "POST"};
export const REGISTRATION_REQUEST = {path: REGISTRATION_PATH, method: "PUT"};
export const ACCOUNT_INFO_REQUEST = {path: ACCOUNT_PATH, method: "GET"};
export const ECOSYSTEMS_REQUEST = {path: ECOSYSTEMS_PATH, method: "GET"};

export const CODE_EXPIRED_TOKEN = 401;
export const CODE_UNKNOWN_TOKEN = 403;

export type ApiConfig = {
    baseUrl: string;
};

export type Request = {
    method: string;
    path: string;
    url: string;
    params: {}|null;
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

export type TokenInfo = {
    access_token: string;
    refresh_token: string;
};

export type PreHandler = (request: Request) => boolean;
export type PostHandler = (response: Response) => boolean;

export class Api {
    private config: ApiConfig;
    private token: TokenInfo|null;
    private user: User|null;
    private beforeRequestHandler: PreHandler|null;
    private successHandler: PostHandler|null;
    private errorHandler: PostHandler|null;
    private lastRequest: Request|null;

    constructor() {
        this.config = {baseUrl: HOME_PAGE};
        this.token = null;
        this.user = null;
        this.beforeRequestHandler = (request: Request) => false;
        this.successHandler = (response: Response) => false;
        this.errorHandler = (response: Response) => false;
        this.lastRequest = null;
    }

    setConfig(config: ApiConfig): void {
        this.config = config;
    }

    setToken(token: TokenInfo|null): void {
        this.token = token;
    }

    setUser(user: User): void {
        this.user = user;
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

    call(request: RequestInfo, params: null|{} = null, headers = {}, isFirstRequest = true): Promise<Response> {
        return this.request(this.createRequest(request, params, headers), isFirstRequest)
    }

    get(path: string, params: null|{} = null, headers = {}): Promise<Response> {
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

    request(request: Request, isFirstTry = true): Promise<Response> {
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
            body: request.params !== null ? JSON.stringify(request.params) : undefined,
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
                this.handleError(response, isFirstTry);
            }
            return response;
        }).catch(error => {
            if (response.status === 405) {
                error = {
                    message: "Method not allowed",
                    code: 405,
                    context: null,
                };
            }
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
        if (headers['X-AUTH-TOKEN'] === undefined && this.token !== null) {
            headers['X-AUTH-TOKEN'] = this.token.access_token;
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

    createRequest(request: RequestInfo, params: {}|null, headers: {}): Request {
        return {method: request.method, path: request.path, url: this.config.baseUrl + request.path, params, headers};
    }

    handlePreRequest(request: Request): void {
        if (this.beforeRequestHandler !== null) {
            if (!this.beforeRequestHandler(request)) {
                return;
            }
        }
        this.lastRequest = request;
    }

    async handleError(response: Response, isFirstTry = true): Promise<void> {
        if (this.errorHandler !== null) {
            if (!this.errorHandler(response)) {
                return;
            }
        }
        if (!isFirstTry || this.token === null || this.user === null) {
            return;
        }
        if (response.status === CODE_EXPIRED_TOKEN) {
            // Refresh token
            const response = await this.call(REFRESH_TOKEN_REQUEST, {refresh_token: this.token.refresh_token}, {}, false);
            if (!response.isSuccess || !('access_token' in response.data) || !('refresh_token' in response.data)) {
                return;
            }
            this.setToken(response.data);
            this.user.setToken(response.data);
            // Reload page
            window.location.reload();
        } else if (response.status === CODE_UNKNOWN_TOKEN) {
            await this.user.logOut(false);
            window.location.reload();
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