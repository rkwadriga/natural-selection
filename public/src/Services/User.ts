import { createContext, useContext } from "react"
import {Api, TokenInfo, ACCOUNT_INFO_REQUEST} from "./Api";
import UserException from "../Exceptions/UserException";

class User {
    private api: Api|null;
    private token: TokenInfo|null;
    private email: string|null;
    private name: string|null;

    constructor() {
        this.api = null;
        const token = localStorage.getItem('user.token');
        this.token = token !== null ? JSON.parse(token) : null;
        this.email = localStorage.getItem('user.email');
        this.name = localStorage.getItem('user.name');
    }

    async logIn(token: TokenInfo): Promise<void> {
        if (this.api === null) {
            throw new UserException("Api component is not installed");
        }
        this.token = token;
        this.api.setToken(token);
        localStorage.setItem('user.token', JSON.stringify(this.token));

        const response = await this.api.call(ACCOUNT_INFO_REQUEST);
        if (!response.isSuccess) {
            throw new UserException("Can not login user: " + response.error.message);
        }

        const data = response.data;
        if (!('email' in data) || !('name' in data)) {
            throw new UserException("Invalid response format: " + JSON.stringify(data));
        }

        this.email = data['email'];
        this.name = data['name'];
        localStorage.setItem('user.email', this.email);
        localStorage.setItem('user.name', this.name);
    }

    logOut(): void {
        this.token = null;
        this.email = null;
        this.name = null;
        localStorage.removeItem('user.token');
        localStorage.removeItem('user.email');
        localStorage.removeItem('user.name');
        this.api?.setToken(null);
    }

    setApi(api: Api): void {
        this.api = api;
        this.api.setToken(this.token);
    }
    isLoggedIn(): boolean {
        return this.token !== null;
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