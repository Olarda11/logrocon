import React, {useState} from "react";
import {Form, InputGroup, FormControl, Button} from "react-bootstrap";
import "./SearchString.scss"

interface SearchStringProps {
    handlerKeyword: (text: string) => void;
}

export const SearchString = (props: SearchStringProps) => {
    const [keyword, setKeyword] = useState('');

    const textHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setKeyword(e.currentTarget.value)
    };

    const handleSubmit = () => {
        if (!keyword) {
            return
        }
        props.handlerKeyword(keyword)
    };

    return (
        <Form className="searchString">
            <InputGroup>
                <FormControl
                    placeholder="Введите текст"
                    aria-label="searchString"
                    onChange={textHandler}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={handleSubmit}>Найти</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
};
