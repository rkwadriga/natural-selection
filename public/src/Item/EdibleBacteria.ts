import {Bacteria} from "./Bacteria";
import {IFood} from "./IFood";
import {ItemType} from "../Types/ItemType";
import {IDrawableItem} from "./IDrawableItem";

export class EdibleBacteria extends Bacteria implements IFood
{
    protected color = [100, 100, 0];
    protected image = "\u25A0";
    protected name = "Edible bacteria";

    getEnergy(): number {
        return this.energy;
    }

    protected isAfraid(item: IDrawableItem): boolean {
        return item.getType() !== ItemType.FOOD && item.getType() !== this.type;
    }

    canEat(item: IDrawableItem): boolean {
        return item.getType() === ItemType.FOOD;
    }

    createClone(): EdibleBacteria {
        return new EdibleBacteria(this.getCloneParams());
    }
}