import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {useApi, LOGIN_REQUEST, ACCOUNT_PAGE} from "../Services/Api";
import {useUser} from "../Services/User";
import ValidationException from "../Exceptions/ValidationException";
import {AlertsContext} from "../App";

type FormData = {
    username: string|null;
    password: string|null;
};

interface Props {

}

const LoginForm: React.FC<Props> = () => {
    const user = useUser();
    const api = useApi();
    const history = useHistory();
    const [data, setData] = useState<FormData>({username: null, password: null});
    const alertFunctions = useContext(AlertsContext);

    const handleInputChange = (event: any) => {
        const input = event.target;
        switch (input.name) {
            case "username":
                data.username = input.value;
                break;
            case "password":
                data.password = input.value;
                break;
        }
        setData(data);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (data.username === null || data.password === null) {
            throw new ValidationException("params \"username\" and \"password\" are required");
        }

        let response = await api.call(LOGIN_REQUEST, data);
        if (!response.isSuccess) {
            alertFunctions.addErrorAlert(response.error.message, 5000);
            return;
        }
        if (!('access_token' in response.data) || !('refresh_token' in response.data)) {
            alertFunctions.addErrorAlert({invalid_data: response.data}, 5000);
            return;
        }

        // Login user
        try {
            await user.logIn(response.data);
        } catch (e) {
            alertFunctions.addErrorAlert(e.message, 5000);
            return;
        }
        alertFunctions.addInfoAlert("User + " + user.getName() + " is logged in!", 5000);
        history.push(ACCOUNT_PAGE);
    };

    return (
        <div className="LoginForm">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="login_form_email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={ handleInputChange } name="username" type="email" placeholder="Example@mail.com" required />
                </Form.Group>

                <Form.Group controlId="login_form_password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={ handleInputChange } name="password" type="password" placeholder="Password" required />
                </Form.Group>

                <Button variant="secondary" type="submit">Login</Button>
            </Form>
        </div>
    );
}
export default LoginForm;