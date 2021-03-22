class Formatter {
    format(object, margin = 0, showOpenTag = true) {
        if (typeof object !== "object") {
            return typeof object === "string" ? object : object;
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
                        <div key={key + "_" + index} style={{ "margin-left": margin + 20 }}>
                            {key + ": " + (isObjectVal ? (!Array.isArray(value) ? "{" : "[") : "")}
                            {this.format(value, 20, false)}
                        </div>
                    )
                })}
                <div style={{ "margin-left": margin }}>{isObject ? "}" : "]"}</div>
            </div>
        );
    }
}
export default Formatter;