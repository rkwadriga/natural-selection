import {Bacteria} from "./Bacteria";
import {ItemType} from "../Types/ItemType";
import {IDrawableItem} from "./IDrawableItem";

export class PredatoryBacteria extends Bacteria
{
    protected readonly color = [255, 0, 0];
    protected readonly image = "\u2B24";

    canEat(item: IDrawableItem): boolean {
        return item.getType() === ItemType.EDIBLE_BACTERIA;
    }
}