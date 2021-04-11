import React, {useState} from "react";
import {Button, Col, Dropdown, DropdownButton, Form, InputGroup, Row} from "react-bootstrap";
import {Bacteria, DefaultConfig, Ecosystem, Food, ItemType} from "../../Ecosystem/Config"
import {setObjectValue} from "../../Helpers/ObjectHelper";
import {addElement, removeElement} from "../../Helpers/ArrayHelper";
import {useApi, CREATE_ECOSYSTEM_REQUEST} from "../../Services/Api";

export type BacteriaType = {
    key: string;
    value: string;
};

interface Props {
    ecosystem: Ecosystem|null
}

const EcosystemForm: React.FC<Props> = ({ecosystem}) => {
    const api = useApi();

    let isNew = false;
    if (ecosystem === null) {
        isNew = true;
        ecosystem = new DefaultConfig();
    }

    // Set bacterias default types (types that doesn't presented in bacterias list)
    const defaultBacteriaTypes: BacteriaType[] = [];
    (Object.keys(ItemType) as Array<keyof typeof ItemType>).forEach(type => {
        const typeValue = ItemType[type];
        if (typeValue === ItemType.FOOD) {
            return;
        }
        let inList = false;
        ecosystem?.bacterias.forEach((bacteria: Bacteria) => {
            if (bacteria.type === typeValue) {
                inList = true;
                return;
            }
        })
        if (!inList) {
            defaultBacteriaTypes.push({key: type, value: typeValue})
        }
    });

    const [data, setData] = useState<Ecosystem>(ecosystem);
    const [errors, setErrors] = useState<Record<string, string>>({});
    // Variable for show/hide new bacteria types dropdown
    const [showBacteriaTypesDropdown, setShowBacteriaTypesDropdown] = useState<boolean>(false);
    const [bacteriaTypes, setBacteriaTypes] = useState<BacteriaType[]>(defaultBacteriaTypes);

    const handleInputChange = (event: any) => {
        const input = event.target;
        setData(setObjectValue(data, input.name, input.value));
    };

    const handleSetBacteriaCount = (index: number, count: number) => {
        data.bacterias[index].count = count;
        setData(setObjectValue(data, 'bacterias', data.bacterias));
    };

    const handleSetFoodDensity = (index: number, density: number) => {
        data.foods[index].density = density;
        setData(setObjectValue(data, 'foods', data.foods));
    };

    const handleSetFoodReproductionSpeed = (index: number, reproductionSpeed: number) => {
        data.foods[index].reproductionSpeed = reproductionSpeed;
        setData(setObjectValue(data, 'foods', data.foods));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        console.log(JSON.stringify(data));

        //const response = await api.call(CREATE_ECOSYSTEM_REQUEST, data);

        //console.log(response);
    }

    const handleAddBacteria = (event: any) => {
        event.preventDefault();
        setShowBacteriaTypesDropdown(!showBacteriaTypesDropdown);
    };

    const handleRemoveBacteria = (index: number) => {
        const bacteria = data.bacterias[index];
        let newType: BacteriaType = {key: 'EDIBLE_BACTERIA', value: ItemType.EDIBLE_BACTERIA};
        switch (bacteria.type) {
            case ItemType.PREDATORY_BACTERIA:
                newType = {key: 'PREDATORY_BACTERIA', value: bacteria.type};
                break;
            case ItemType.OMNIVOROUS_BACTERIA:
                newType = {key: 'OMNIVOROUS_BACTERIA', value: bacteria.type};
                break;
        }
        setData(setObjectValue(data, 'bacterias', removeElement(data.bacterias, index)));
        setBacteriaTypes(addElement(bacteriaTypes, newType));
    };

    const handleSelectNewBacteriaType = (type: string, index: number) => {
        setData(setObjectValue(data, 'bacterias', addElement(data.bacterias, {type: type, count: 0})));
        setBacteriaTypes(removeElement(bacteriaTypes, index));
        setShowBacteriaTypesDropdown(!showBacteriaTypesDropdown);
    };

    return (
        <div className="EcosystemForm align-left">
            <Form onSubmit={handleSubmit}>
                <h5>Base settings</h5>
                <Form.Group controlId="ecosystem_form_name">
                    <Form.Label>Name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            onChange={ handleInputChange }
                            isInvalid={errors.name !== undefined}
                            name="name" type="string"
                            placeholder="Ecosystem Name"
                            value={data.name}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name !== undefined ? errors.name : null}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId="ecosystem_form_width">
                            <Form.Label>Board Width</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    onChange={ handleInputChange }
                                    isInvalid={errors.width !== undefined}
                                    name="width" type="number"
                                    placeholder="Board width"
                                    value={data.width}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.width !== undefined ? errors.width : null}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="ecosystem_form_speed">
                            <Form.Label>Evolution speed</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    onChange={ handleInputChange }
                                    isInvalid={errors.speed !== undefined}
                                    name="speed" type="number"
                                    placeholder="Evolution speed"
                                    value={data.speed}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.speed !== undefined ? errors.speed : null}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="ecosystem_form_height">
                            <Form.Label>Board Height</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    onChange={ handleInputChange }
                                    isInvalid={errors.height !== undefined}
                                    name="height" type="number"
                                    placeholder="Board height"
                                    value={data.height}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.height !== undefined ? errors.height : null}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="ecosystem_form_duration">
                            <Form.Label>Evolution duration</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    onChange={ handleInputChange }
                                    isInvalid={errors.duration !== undefined}
                                    name="duration" type="number"
                                    placeholder="Evolution duration"
                                    value={data.duration}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.duration !== undefined ? errors.duration : null}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <h5>Food</h5>
                <Row>
                    <Col><Form.Label>Type</Form.Label></Col>
                    <Col><Form.Label>Density</Form.Label></Col>
                    <Col><Form.Label>Reproduction speed</Form.Label></Col>
                </Row>
                { data.foods.map((food: Food, index: number) => {
                    return (
                        <Row key={'ecosystem_form_food_' + index}>
                            <Col>
                                <Form.Group controlId={'ecosystem_form_food_' + index + 'type'}>
                                    <InputGroup>
                                        <Form.Control
                                            value={data.foods[index].type}
                                            readOnly
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId={'ecosystem_form_food_' + index + 'density'}>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            onChange={ event => { handleSetFoodDensity(index, Number(event.target.value)) } }
                                            isInvalid={errors.foods !== undefined && errors.foods[index] !== undefined}
                                            name="food[density]" type="number"
                                            placeholder="Food density"
                                            value={data.foods[index].density}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId={'ecosystem_form_food_' + index + 'reproductionSpeed'}>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            onChange={ event => { handleSetFoodReproductionSpeed(index, Number(event.target.value)) } }
                                            isInvalid={errors.foods !== undefined && errors.foods[index] !== undefined}
                                            name="food[reproductionSpeed]" type="number"
                                            placeholder="Food density"
                                            value={data.foods[index].reproductionSpeed}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            { errors.foods !== undefined && errors.foods[index] !== undefined
                                ? (
                                    <Form.Control.Feedback type="invalid">
                                        { errors.foods[index] }
                                    </Form.Control.Feedback>
                                )
                                : null
                            }
                        </Row>
                    )
                }) }

                <h5>Bacterias</h5>
                <Row>
                    <Col><Form.Label>Type</Form.Label></Col>
                    <Col><Form.Label>Count</Form.Label></Col>
                </Row>
                { data.bacterias.map((bacteria: Bacteria, index: number) => {
                    return (
                        <Row key={'ecosystem_form_bacteria_' + index}>
                            <Col>
                                <Form.Group controlId={'ecosystem_form_bacteria_' + index + '_type'}>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            value={bacteria.type}
                                            readOnly
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId={'ecosystem_form_bacteria_' + index + '_count'}>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            onChange={ event => { handleSetBacteriaCount(index, Number(event.target.value)) } }
                                            isInvalid={errors.bacterias !== undefined && errors.bacterias[index] !== undefined}
                                            name={'bacterias[' + index + '][count]'} type="number"
                                            placeholder="Bacteria count"
                                            value={bacteria.count}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Button variant="danger" onClick={() => { handleRemoveBacteria(index) }}>-</Button>
                            </Col>

                            { errors.bacterias !== undefined && errors.bacterias[index] !== undefined
                                ? (
                                    <Form.Control.Feedback type="invalid">
                                        { errors.bacterias[index] }
                                    </Form.Control.Feedback>
                                )
                                : null
                            }
                        </Row>
                    )
                }) }
                <Row>
                    <Col>
                        { bacteriaTypes.length > 0
                            ? (
                                <Button variant="primary" onClick={handleAddBacteria}>{showBacteriaTypesDropdown ? '-' : '+'}</Button>
                            )
                            : null
                        }
                    </Col>
                    <Col>
                        { showBacteriaTypesDropdown
                            ? (
                                <DropdownButton title="Tape" variant="secondary">
                                    { bacteriaTypes.map((type: BacteriaType, index) => {
                                        return (
                                            <Dropdown.Item
                                                key={'ecosystem_form_new_bacteria_type_' + type.key}
                                                onSelect={ () => {handleSelectNewBacteriaType(type.value, index)} }
                                            >
                                                { type.value }
                                            </Dropdown.Item>
                                        );
                                    }) }
                                </DropdownButton>
                            )
                            : null
                        }
                    </Col>
                </Row>

                <Button variant="secondary" type="submit">{ isNew ? 'Create' : 'Update' }</Button>
            </Form>
        </div>
    );
}
export default EcosystemForm;