import React from "react";
import {Nav} from 'react-bootstrap';
import {LOGIN_PAGE, REGISTRATION_PAGE} from "../Services/Api";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";


interface Props {

}

const Auth: React.FC<Props> = () => {
    const page = window.location.pathname;

    return (
        <div className="Auth">
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link
                        href={LOGIN_PAGE}
                        active={page === LOGIN_PAGE}
                        disabled={page === LOGIN_PAGE}
                    >
                        Login
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        href={REGISTRATION_PAGE}
                        active={page === REGISTRATION_PAGE}
                        disabled={page === REGISTRATION_PAGE}
                    >
                        Registration
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <div>
                {page === LOGIN_PAGE ? <LoginForm /> : <RegistrationForm />}
            </div>
        </div>
    );
}
export default Auth;