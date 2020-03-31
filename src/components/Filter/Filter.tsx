import React, {useCallback} from "react";
import {Form} from "react-bootstrap";
import "./Filter.scss";

interface FilterProps {
    label: string;
    data: [];
    handlerSelectOption: (type: string, id: string) => void;
    name: string;
}

interface IData {
    name: string;
    id: string;
}

const Filter = (props: FilterProps) => {
    const handleChange = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
        const currentTargetId = event.currentTarget.value;
        props.handlerSelectOption(props.name, currentTargetId)
    }, []);

    if (props.data.length < 1) {
        return null
    }

    return (
        <Form>
            <Form.Group controlId={props.name}>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control as="select" custom onChange={handleChange}>
                    <option>Не выбрано</option>
                    {props.data.map((item: IData) => {
                        return (<option key={item.id} value={item.id}>{item.name}</option>)
                    })}
                </Form.Control>
            </Form.Group>
        </Form>
    )
};

export default Filter
