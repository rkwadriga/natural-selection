import {Bacteria} from "./Bacteria";
import {IDrawableItem} from "./IDrawableItem";
import {ItemType} from "../Types/ItemType";

export class OmnivorousBacteria extends Bacteria
{
    protected color = [0, 255, 255];
    protected image = "\u25C8";
    protected name = "Omnivorous bacteria";
    protected energy = 10;
    protected movementCost = 0.05;
    protected eatingCost = 0.6;

    canEat(item: IDrawableItem): boolean {
        return item.getType() === ItemType.EDIBLE_BACTERIA || item.getType() === ItemType.FOOD;
    }

    createClone(): OmnivorousBacteria {
        return new OmnivorousBacteria(this.getCloneParams());
    }

    protected isAfraid(item: IDrawableItem): boolean {
        return item.getType() === ItemType.PREDATORY_BACTERIA;
    }
}