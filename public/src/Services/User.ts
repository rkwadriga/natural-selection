import { createContext, useContext } from "react"
import {Api, TokenInfo, ACCOUNT_INFO_REQUEST} from "./Api";
import UserException from "../Exceptions/UserException";

class User {
    private api: Api|null;
    private loggedIn: boolean;
    private email: string|null;
    private name: string|null;

    constructor() {
        this.api = null;
        this.loggedIn = false;
        this.email = null;
        this.name = null;
    }

    async logIn(token: TokenInfo): Promise<void> {
        if (this.api === null) {
            throw new UserException("Api component is not installed");
        }
        this.api.setToken(token);

        const response = await this.api.call(ACCOUNT_INFO_REQUEST);
        if (!response.isSuccess) {
            throw new UserException("Can not login user: " + response.error.message);
        }

        const data = response.data;
        if (!('email' in data) || !('name' in data)) {
            throw new UserException("Invalid response format: " + JSON.stringify(data));
        }

        this.loggedIn = true;
        this.email = data['email'];
        this.name = data['name'];
    }

    setApi(api: Api): void {
        this.api = api;
    }
    isLoggedIn(): boolean {
        return this.loggedIn;
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