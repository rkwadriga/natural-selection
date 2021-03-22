import React, {useState} from "react";

interface Props {
    children: (data: {
        count: number,
        setCount: React.Dispatch<React.SetStateAction<number>>
    }) => JSX.Element | null;
}

const Counter: React.FC<Props> = ({ children }) => {
    const [count, setCount] = useState(0);

    return (
        <div className="Counter">
            {children({ count, setCount })}
        </div>
    );
}
export default Counter;