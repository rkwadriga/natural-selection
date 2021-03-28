class Exception implements Error {
    name = "Undefined exception";
    message: string;
    code: number;
    context: unknown;

    constructor(message: string, code = 0, context = null) {
        this.message = message;
        this.code = code;
        this.context = context;
    }
}
export default Exception;