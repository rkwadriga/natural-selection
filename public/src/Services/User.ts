import { createContext, useContext } from "react"
import {Api, TokenInfo, ACCOUNT_INFO_REQUEST, LOGOUT_REQUEST} from "./Api";
import UserException from "../Exceptions/UserException";

export class User {
    private api: Api|null;
    private token: TokenInfo|null;
    private email: string|null;
    private name: string|null;

    constructor() {
        this.api = null;
        this.token = null;
        const token = localStorage.getItem('user.token');
        if (token !== null) {
            this.setToken(JSON.parse(token), false);
        }
        this.email = null;
        this.name = null;
    }

    async logIn(token: TokenInfo): Promise<void> {
        if (this.api === null) {
            throw new UserException("Api component is not installed");
        }
        this.setToken(token);
        this.api.setToken(token);
        await this.initialize();
    }

    async initialize(): Promise<void> {
        if (!this.isLoggedIn() || this.isInitialized()) {
            return;
        }
        if (this.api === null) {
            throw new UserException("Api component is not installed");
        }

        const response = await this.api.call(ACCOUNT_INFO_REQUEST);
        if (!response.isSuccess) {
            throw new UserException("Can not get user info: " + response.error.message, response.status);
        }

        const data = response.data;
        if (!('email' in data) || !('name' in data)) {
            throw new UserException("Invalid response format: " + JSON.stringify(data));
        }

        this.email = data['email'];
        this.name = data['name'];
        return;
    }

    async logOut(needRequest = true): Promise<void> {
        if (!this.isLoggedIn()) {
            return;
        }
        const response = needRequest && this.api !== null ? await this.api.call(LOGOUT_REQUEST) : null;
        if (response === null || response.isSuccess) {
            this.token = null;
            this.email = null;
            this.name = null;
            this.setToken(null);
            this.api?.setToken(null);
        }
        if (response !== null) {
            window.location.reload();
        }
        return;
    }

    setApi(api: Api): void {
        this.api = api;
        this.api.setUser(this);
        this.api.setToken(this.token);
    }

    setToken(token: TokenInfo|null, needToUpdateStorage = true): void {
        this.token = token;
        if (needToUpdateStorage) {
            if (this.token !== null) {
                localStorage.setItem('user.token', JSON.stringify(this.token));
            } else {
                localStorage.removeItem('user.token');
            }
        }
    }

    isLoggedIn(): boolean {
        return this.token !== null;
    }
    isInitialized(): boolean {
        return this.email !== null;
    }
    getEmail(): string|null {
        return this.email;
    }
    getName(): string|null {
        return this.name;
    }
}

const UserContext = createContext<User>(new User());
export const useUser = () => useContext(UserContext);