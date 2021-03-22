import React, { useReducer } from "react";

type Action =
   | { type: "add"; text: string }
   | { type: "remove"; idx: number };

interface Todo {
    text: string;
    complete: boolean;
}

type State = Todo[];

const TodoReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "add":
            return [...state, { text: action.text, complete: false }];
        case "remove":
            return state.filter((_, i) => action.idx !== 1);
        default:
            return state;
    }
}

const ReducerExample: React.FC = () => {
    const [todos, dispatch] = useReducer(TodoReducer, []);

    return (
        <div className="ReducerExample">
            { JSON.stringify(todos) }
            <button
                onClick={() => {
                    dispatch({type: "add", text: "..."});
                    //dispatch({type: "remove", idx: 12345})
                }}
            >
                +
            </button>
        </div>
    );
}
export default ReducerExample;