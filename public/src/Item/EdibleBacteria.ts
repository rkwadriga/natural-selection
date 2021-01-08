import {Bacteria} from "./Bacteria";
import {IFood} from "./IFood";
import {ItemType} from "../Types/ItemType";
import {IField} from "../Field/IField";
import {IDrawableItem} from "./IDrawableItem";

export class EdibleBacteria extends Bacteria implements IFood
{
    constructor(field: IField, x: number, y: number, color = [100, 100, 0], image = "\u25A0", speed = 1, energy = 10)
    {
        super(field, x, y, color, image, energy, speed, ItemType.EDIBLE_BACTERIA);
    }

    getEnergy(): number {
        return this.energy;
    }

    canEat(item: IDrawableItem): boolean {
        return item.getType() === ItemType.FOOD;
    }
}