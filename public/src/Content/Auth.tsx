import React from "react";
import {Row, Col, Nav} from 'react-bootstrap';
import {useApi} from "../Services/Api";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";


interface Props {

}

const Auth: React.FC<Props> = () => {
    const api = useApi();
    const page = window.location.pathname;

    return (
        <div className="Auth">
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link
                        href={api.LOGIN_PAGE}
                        active={page === api.LOGIN_PAGE}
                        disabled={page === api.LOGIN_PAGE}
                    >
                        Login
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        href={api.REGISTRATION_PAGE}
                        active={page === api.REGISTRATION_PAGE}
                        disabled={page === api.REGISTRATION_PAGE}
                    >
                        Registration
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <div>
                {page === api.LOGIN_PAGE ? <LoginForm /> : <RegistrationForm />}
            </div>
        </div>
    );
}
export default Auth;