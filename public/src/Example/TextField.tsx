import React, {useRef, useState} from "react";

interface Person {
    name: string;
}

interface TextNode {
    text: string;
}

interface Props {
    text: string;
    ok?: boolean;
    i?: number;
    fn?: (param: string) => number;
    obj?: { f1: string };
    person: Person;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const TextField: React.FC<Props> = ({ handleChange }) => {
    //const [count, setCount] = useState<number | null>(5);
    //const [count, setCount] = useState<text: string>({text: 'hello'});
    const [node, setNode] = useState<TextNode>();

    //setNode({text: 'Hello world!'});

    const divRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="TextField" ref={divRef}>
            <input ref={inputRef} onChange={handleChange} />
        </div>
    );
}
export default TextField;