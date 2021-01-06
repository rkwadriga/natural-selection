import {DrawableItem} from "./DrawableItem";
import {IFood} from "./IFood";
import {ItemType} from "../Types/ItemType";
import {IField} from "../Field/IField";

export class Food extends DrawableItem implements IFood
{
    protected readonly energy: number;

    constructor(field: IField, x: number, y: number, energy = 1, color = [0, 200, 0], image = "\u25B2")
    {
        super(field, x, y, color, image, ItemType.FOOD);
        this.energy = energy;
    }

    getEnergy(): number {
        return this.energy;
    }
}