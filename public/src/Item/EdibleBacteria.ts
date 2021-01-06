import {Bacteria} from "./Bacteria";
import {IFood} from "./IFood";
import {ItemType} from "../Types/ItemType";
import {IField} from "../Field/IField";

export class EdibleBacteria extends Bacteria implements IFood
{
    constructor(field: IField, x: number, y: number, color = [255, 0, 0], image = "\u2B24", speed = 1, energy = 10)
    {
        super(field, x, y, color, image, energy, speed, ItemType.EDIBLE_BACTERIA);
    }

    getEnergy(): number {
        return this.energy;
    }
}