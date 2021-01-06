import {Bacteria} from "./Bacteria";
import {IFood} from "./IFood";
import {ItemType} from "./ItemType";

export class EdibleBacteria extends Bacteria implements IFood
{
    constructor(x: number, y: number, color = [255, 0, 0], image = "\u2B24", energy = 10)
    {
        super(x, y, color, image, energy, ItemType.EDIBLE_BACTERIA);
    }

    getEnergy(): number {
        return this.energy;
    }
}