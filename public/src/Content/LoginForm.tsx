import React, {useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useApi, LOGIN_REQUEST} from "../Services/Api";
import ValidationException from "../Exceptions/ValidationException";
import {AlertsContext} from "../App";

type FormData = {
    username: string|null;
    password: string|null;
};

interface Props {

}

const LoginForm: React.FC<Props> = () => {
    const api = useApi();
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