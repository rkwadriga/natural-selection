import {Bacteria} from "./Bacteria";
import {IFood} from "./IFood";
import {ItemType} from "../Types/ItemType";
import {IDrawableItem} from "./IDrawableItem";

export class EdibleBacteria extends Bacteria implements IFood
{
    protected readonly color = [100, 100, 0];
    protected readonly image = "\u25A0";

    getEnergy(): number {
        return this.energy;
    }

    canEat(item: IDrawableItem): boolean {
        return item.getType() === ItemType.FOOD;
    }

    createClone(): EdibleBacteria {
        return new EdibleBacteria(this.getCloneParams());
    }
}