import React from "react";
import {LOGIN_PAGE, REGISTRATION_PAGE, ACCOUNT_PAGE, HOME_PAGE} from "../Services/Api";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {inArray} from "../Helpers/ArrayHelper";
import {useUser} from "../Services/User";
import Body from "./Body";
import Auth from "./Auth";
import Account from "./Account";

interface Props {

}

const Router: React.FC<Props> = () => {
    const user = useUser();
    const page = window.location.pathname
    let reDirectPage = null;
    if (!user.isLoggedIn() && page !== LOGIN_PAGE && page !== REGISTRATION_PAGE) {
        reDirectPage = LOGIN_PAGE;
    } else if (user.isLoggedIn() && (inArray(page, [LOGIN_PAGE, REGISTRATION_PAGE, HOME_PAGE]))) {
        reDirectPage = ACCOUNT_PAGE;
    }

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
                    <Route path={ACCOUNT_PAGE}>
                        <Account />
                    </Route>
                </Switch>
                <Route exact path={window.location.pathname}>
                    {reDirectPage === null ? <Body /> : <Redirect to={reDirectPage} />}
                </Route>
            </BrowserRouter>
        </div>
    );
}
export default Router;