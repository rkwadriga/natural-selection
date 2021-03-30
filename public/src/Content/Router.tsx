import React from "react";
import {LOGIN_PAGE, REGISTRATION_PAGE, ECOSYSTEMS_PAGE, HOME_PAGE} from "../Services/Api";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {inArray} from "../Helpers/ArrayHelper";
import {useUser} from "../Services/User";
import Body from "./Body";
import Auth from "./Auth";
import Ecosystems from "./Ecosystems";

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
                </Switch>
                <Route exact path={window.location.pathname}>
                    {reDirectPage === null ? <Body /> : <Redirect to={reDirectPage} />}
                </Route>
            </BrowserRouter>
        </div>
    );
}
export default Router;