import React from "react";
import {LOGIN_PAGE, REGISTRATION_PAGE} from "../Services/Api";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {useUser} from "../Services/User";
import Body from "./Body";
import Auth from "./Auth";

interface Props {

}

const Router: React.FC<Props> = () => {
    const user = useUser();
    const page = window.location.pathname
    const needToRedirect = !user.isLoggedIn() && page !== LOGIN_PAGE && page !== REGISTRATION_PAGE;

    return (
        <div className="Router">
            <BrowserRouter>
                <Switch>
                    <Route path={REGISTRATION_PAGE}>
                        <Auth />
                    </Route>
                    <Route path={LOGIN_PAGE}>
                        <Auth />
                    </Route>
                </Switch>
                <Route exact path={window.location.pathname}>
                    {!needToRedirect ? <Body /> : <Redirect to={LOGIN_PAGE} />}
                </Route>
            </BrowserRouter>
        </div>
    );
}
export default Router;