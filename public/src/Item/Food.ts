import {DrawableItem} from "./DrawableItem";
import {IFood} from "./IFood";
import {ItemType} from "./ItemType";

export class Food extends DrawableItem implements IFood
{
    protected readonly energy: number;

    constructor(x: number, y: number, energy = 1, color = [0, 0, 0], image = "")
    {
        super(x, y, color, image, ItemType.FOOD);
        this.energy = energy;
    }

    getEnergy(): number {
        return this.energy;
    }
}