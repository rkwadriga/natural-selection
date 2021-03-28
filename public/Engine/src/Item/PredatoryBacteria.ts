import {Bacteria} from "./Bacteria";
import {ItemType} from "../Types/ItemType";
import {IDrawableItem} from "./IDrawableItem";

export class PredatoryBacteria extends Bacteria
{
    protected color = [255, 0, 0];
    protected image = "\u2B24";
    protected name = "Predatory bacteria";
    protected eatingCost = 0.6;

    canEat(item: IDrawableItem): boolean {
        return item.getType() === ItemType.EDIBLE_BACTERIA || item.getType() === ItemType.OMNIVOROUS_BACTERIA;
    }

    createClone(): PredatoryBacteria {
        return new PredatoryBacteria(this.getCloneParams());
    }
}