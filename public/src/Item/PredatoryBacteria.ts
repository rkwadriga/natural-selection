import {Bacteria} from "./Bacteria";
import {ItemType} from "../Types/ItemType";
import {IField} from "../Field/IField";
import {IDrawableItem} from "./IDrawableItem";

export class PredatoryBacteria extends Bacteria
{
    constructor(field: IField, x: number, y: number, color = [255, 0, 0], image = "\u2B24", speed = 1, energy = 10)
    {
        super(field, x, y, color, image, energy, speed, ItemType.PREDATORY_BACTERIA);
    }

    canEat(item: IDrawableItem): boolean {
        return item.getType() === ItemType.EDIBLE_BACTERIA;
    }
}