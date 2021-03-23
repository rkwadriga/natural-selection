import { createContext, useContext } from "react"

class Formatter {
    format(object: any, margin = 0, showOpenTag = true) {
        if (typeof object !== "object") {
            return object;
        }
        let index = 0;
        const isObject = !Array.isArray(object);
        return (
            <div>
                {showOpenTag ? <div>{isObject ? "{" : "["}</div> : ""}
                {Object.keys(object).map(key => {
                    index++;
                    let value = object[key];
                    const isObjectVal = (typeof value === 'object');
                    if (isObject) {
                        key = "\"" + key + "\"";
                    }
                    if (typeof value === "string") {
                        value = "\"" + value + "\"";
                    } else if (value === null) {
                        value = "NULL";
                    } else if (value === true) {
                        value = "TRUE";
                    } else if (value === false) {
                        value = "FALSE";
                    }
                    return (
                        <div key={key + "_" + index} style={{ "margin-left": (margin + 20) + "px" }}>
                            {key + ": " + (isObjectVal ? (!Array.isArray(value) ? "{" : "[") : "")}
                            {this.format(value, 20, false)}
                        </div>
                    )
                })}
                <div style={{"margin-left": margin + "px"} }>{isObject ? "}" : "]"}</div>
            </div>
        );
    }
}

export const FormatterContext = createContext(new Formatter());
export const useFormatter = () => useContext(FormatterContext);