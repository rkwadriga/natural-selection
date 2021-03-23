import React from "react";
import {Button, Form} from "react-bootstrap";
import {useApi} from "../Services/Api";

interface Props {

}

const LoginForm: React.FC<Props> = () => {
    const handleInputChange = () => {
        console.log('handleInputChange');
    };

    const handleSubmit = () => {
        console.log('handleSubmit');
    };

    const api = useApi();
    console.log(api);

    return (
        <div className="LoginForm">
            <Form onSubmit={ handleSubmit }>
                <Form.Group controlId="login_form_email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={ handleInputChange } name="email" type="email" placeholder="Example@mail.com" required />
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