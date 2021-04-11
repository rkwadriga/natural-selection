import React from "react";
import {
    HOME_PAGE,
    LOGIN_PAGE,
    REGISTRATION_PAGE,
    ECOSYSTEMS_PAGE,
    CREATE_ECOSYSTEM_PAGE
} from "../Services/Api";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {inArray} from "../Helpers/ArrayHelper";
import {useUser} from "../Services/User";
import Auth from "./Auth";
import Ecosystems from "./Ecosystems";
import CreateEcosystem from "./Ecosystem/CreateEcosystem";

interface Props {

}

const Router: React.FC<Props> = () => {
    const user = useUser();
    const page = window.location.pathname
    let reDirectPage = null;
    if (!user.isLoggedIn() && !inArray(page, [LOGIN_PAGE, REGISTRATION_PAGE])) {
        reDirectPage = LOGIN_PAGE;
    } else if (user.isLoggedIn() && (inArray(page, [LOGIN_PAGE, REGISTRATION_PAGE, HOME_PAGE]))) {
        reDirectPage = ECOSYSTEMS_PAGE;
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
                    <Route path={ECOSYSTEMS_PAGE}>
                        <Ecosystems />
                    </Route>
                    <Route path={CREATE_ECOSYSTEM_PAGE}>
                        <CreateEcosystem />
                    </Route>
                </Switch>
                <Route exact path={window.location.pathname}>
                    {reDirectPage === null ? null : <Redirect to={reDirectPage} />}
                </Route>
            </BrowserRouter>
        </div>
    );
}
export default Router;