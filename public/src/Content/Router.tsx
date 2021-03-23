import React from "react";
import {useApi} from "../Services/Api";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import Body from "./Body";

interface Props {

}

const Router: React.FC<Props> = () => {
    const isLoggedIn = false;
    const api = useApi();

    return (
        <div className="Router">
            <BrowserRouter>
                <Route exact path={window.location.pathname}>
                    {isLoggedIn ? <Body /> : <Redirect to={api.LOGIN_PAGE} />}
                </Route>
            </BrowserRouter>
        </div>
    );
}
export default Router;