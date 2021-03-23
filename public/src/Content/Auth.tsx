import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Row, Col, Nav} from 'react-bootstrap';
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";


interface Props {

}

const Auth: React.FC<Props> = () => {
    const HOME_PAGE = '/';
    const LOGIN_PAGE = '/login';
    const REGISTRATION_PAGE = '/registration';

    let history = useHistory();
    console.log(history);

    const [page, setPage] = useState<string>(window.location.pathname);
    if (page === HOME_PAGE) {

    }

    const switchPage = (page: string) => {
        setPage(page);
    };

    //console.log(page);

    return (
        <div className="Auth">

        </div>
    );
}
export default Auth;