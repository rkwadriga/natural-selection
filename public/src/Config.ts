export class Config
{
    width: number;
    height: number;
    foodCount: number;
    edibleBacteriaCount: number;
    predatoryBacteriaCount: number;
    duration: number;
    speed: number;

    constructor(params: object)
    {
        this.width = params['width'] !== undefined ? params['width'] : 120;
        this.height = params['height'] !== undefined ? params['height'] : 70;
        this.foodCount = params['foodCount'] !== undefined ? params['foodCount'] : 120;
        this.edibleBacteriaCount = params['edibleBacteriaCount'] !== undefined ? params['edibleBacteriaCount'] : 70;
        this.predatoryBacteriaCount = params['predatoryBacteriaCount'] !== undefined ? params['predatoryBacteriaCount'] : 30;
        this.duration = params['duration'] !== undefined ? params['duration'] : 120;
        this.speed = params['speed'] !== undefined ? params['speed'] : 10;
    }
}