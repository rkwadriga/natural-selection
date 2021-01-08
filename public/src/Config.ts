export class Config
{
    width: number = 50;
    height: number = 25;
    foodCount: number = 50;
    foodReproductionSpeed: number = 0;
    edibleBacteriaCount: number = 0;
    predatoryBacteriaCount: number = 0;
    duration: number = 0;
    speed: number = 1;

    constructor(params: object)
    {
        for (let param in params) {
            if (this[param] !== undefined) {
                this[param] = params[param];
            }
        }
    }
}