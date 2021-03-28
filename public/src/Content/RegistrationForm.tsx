import React, {useState, useContext} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {useApi} from "../Services/Api";
import ValidationException from "../Exceptions/ValidationException";
import {AlertsContext} from "../App";
import {VALIDATION_ERROR, NOT_UNIQUE_ERROR} from "../Helpers/FormHelper";
import {setObjectValue} from "../Helpers/ObjectHelper";

type FormData = {
    email: string|null;
    name: string|null;
    password: string|null;
    repeatPassword: string|null;
};

interface Props {

}

const RegistrationForm: React.FC<Props> = () => {
    const defaultData = {email: null, name: null, password: null, repeatPassword: null};
    const api = useApi();
    const [data, setData] = useState<FormData>(defaultData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const alertFunctions = useContext(AlertsContext);

    const handleInputChange = (event: any) => {
        const input = event.target;
        switch (input.name) {
            case "email":
                data.email = input.value;
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
        setErrors({});

        if (data.email === null || data.password === null || data.repeatPassword === null) {
            throw new ValidationException("params \"email\", \"password\" and \"repeatPassword\" are required");
        }
        if (data.password !== data.repeatPassword) {
            setErrors(setObjectValue(errors, "repeatPassword", "Passwords are not mach"));
            return;
        }

        let response = await api.call(api.REGISTRATION_REQUEST, data);
        if (!response.isValid) {
            const error = response.error;
            if (error === null) {
                //alertFunctions.addErrorAlert(error, 0);
            } else if (error.code === VALIDATION_ERROR) {
                alertFunctions.addErrorAlert(error, 0);
            }
        }
    };

    return (
        <div className="RegistrationForm">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="registration_form_email">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            onChange={ handleInputChange }
                            isInvalid={errors.email !== undefined}
                            name="email" type="email"
                            placeholder="Example@mail.com" required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email !== undefined ? errors.email : null}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="registration_form_name">
                    <Form.Label>Name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            onChange={ handleInputChange }
                            isInvalid={errors.name !== undefined}
                            name="name"
                            type="string"
                            placeholder="Firstname Lastname"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name !== undefined ? errors.name : null}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="registration_form_password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            onChange={ handleInputChange }
                            isInvalid={errors.password !== undefined}
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password !== undefined ? errors.password : null}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="registration_form_repeatPassword">
                    <Form.Label>Repeat password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            onChange={ handleInputChange }
                            isInvalid={errors.repeatPassword !== undefined}
                            name="repeatPassword"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.repeatPassword !== undefined ? errors.repeatPassword : null}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Button variant="secondary" type="submit">Registration</Button>
            </Form>
        </div>
    );
}
export default RegistrationForm;