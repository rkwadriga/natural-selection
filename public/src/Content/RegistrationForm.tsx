import React, {useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {useApi} from "../Services/Api";
import ValidationException from "../Exceptions/ValidationException";

type FormData = {
    username: string|null;
    name: string|null;
    password: string|null;
    repeatPassword: string|null;
};

interface Props {

}

const RegistrationForm: React.FC<Props> = () => {
    const api = useApi();
    const [data, setData] = useState<FormData>({username: null, name: null, password: null, repeatPassword: null});
    const [repeatPasswordError, setRepeatPasswordError] = useState<string|null>(null);

    const handleInputChange = (event: any) => {
        const input = event.target;
        switch (input.name) {
            case "username":
                data.username = input.value;
                break;
            case "name":
                data.name = input.value;
                break;
            case "password":
                data.password = input.value;
                break;
            case "repeatPassword":
                data.repeatPassword = input.value;
                break;
        }
        setData(data);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setRepeatPasswordError(null);

        if (data.username === null || data.password === null || data.repeatPassword === null) {
            throw new ValidationException("params \"username\", \"password\" and \"repeatPassword\" are required");
        }
        if (data.password !== data.repeatPassword) {
            setRepeatPasswordError("Passwords are not mach");
            return;
        }

        let response = await api.call(api.REGISTRATION_REQUEST, data);
        console.log(response);
    };

    return (
        <div className="RegistrationForm">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="registration_form_email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={ handleInputChange } name="username" type="email" placeholder="Example@mail.com" required />
                </Form.Group>

                <Form.Group controlId="registration_form_name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={ handleInputChange } name="name" type="string" placeholder="Firstname Lastname" />
                </Form.Group>

                <Form.Group controlId="registration_form_password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={ handleInputChange } name="password" type="password" placeholder="Password" required />
                </Form.Group>

                <Form.Group controlId="registration_form_repeatPassword">
                    <Form.Label>Repeat password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            onChange={ handleInputChange }
                            isInvalid={repeatPasswordError !== null}
                            name="repeatPassword"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {repeatPasswordError}
                        </Form.Control.Feedback>
                    </InputGroup>

                </Form.Group>

                <Button variant="secondary" type="submit">Registration</Button>
            </Form>
        </div>
    );
}
export default RegistrationForm;