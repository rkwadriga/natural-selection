export class Config
{
    width: number = 50;
    height: number = 25;
    duration: number = 0;
    speed: number = 1;
    foods: Array<object> = [];
    bacterias: Array<object> = [];

    constructor(params: object)
    {
        for (let param in params) {
            if (this[param] !== undefined) {
                this[param] = params[param];
            }
        }
    }
}