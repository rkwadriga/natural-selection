class Exception {
    name = "Undefined exception";
    message: string;
    code: number;

    constructor(message: string, code = 0) {
        this.message = message;
        this.code = code;
    }
}
export default Exception;