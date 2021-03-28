import React, {useState, useContext} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {useApi, REGISTRATION_REQUEST, VALIDATION_ERROR, NOT_UNIQUE_ERROR} from "../Services/Api";
import ValidationException from "../Exceptions/ValidationException";
import {AlertsContext} from "../App";
import {setObjectValue} from "../Helpers/ObjectHelper";

interface Props {

}

const RegistrationForm: React.FC<Props> = () => {
    const api = useApi();
    const [data, setData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const alertFunctions = useContext(AlertsContext);

    const addError = (field: string, message: string) => {
        setErrors(setObjectValue(errors, field, message));
    };

    const handleInputChange = (event: any) => {
        const input = event.target;
        setData(setObjectValue(data, input.name, input.value));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setErrors({});

        if (data.email === null || data.password === null || data.repeatPassword === null) {
            throw new ValidationException("params \"email\", \"password\" and \"repeatPassword\" are required");
        }
        if (data.password !== data.repeatPassword) {
            addError("repeatPassword", "Passwords are not mach");
            return;
        }

        let response = await api.call(REGISTRATION_REQUEST, data);
        if (!response.isSuccess) {
            const error = response.error;
            if (error.code === VALIDATION_ERROR) {
                const fields = error.context.fields;
                Object.keys(fields).forEach(key => {
                    const fieldErrorContext = fields[key];
                    if (fieldErrorContext.code === NOT_UNIQUE_ERROR) {
                        addError(key, "User with this email is already registered.");
                    } else {
                        addError(key, fieldErrorContext.error);
                    }
                })
            } else {
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