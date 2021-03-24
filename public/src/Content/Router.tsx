import React from "react";
import {useApi} from "../Services/Api";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import Body from "./Body";
import Auth from "./Auth";

interface Props {

}

const Router: React.FC<Props> = () => {
    const isLoggedIn = false;
    const api = useApi();
    const page = window.location.pathname
    const needToRedirect = !isLoggedIn && page !== api.LOGIN_PAGE && page !== api.REGISTRATION_PAGE;

    return (
        <div className="Router">
            <BrowserRouter>
                <Switch>
                    <Route path={api.REGISTRATION_PAGE}>
                        <Auth />
                    </Route>
                    <Route path={api.LOGIN_PAGE}>
                        <Auth />
                    </Route>
                </Switch>
                <Route exact path={window.location.pathname}>
                    {!needToRedirect ? <Body /> : <Redirect to={api.LOGIN_PAGE} />}
                </Route>
            </BrowserRouter>
        </div>
    );
}
export default Router;