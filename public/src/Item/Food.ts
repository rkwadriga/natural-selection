import {DrawableItem} from "./DrawableItem";
import {IFood} from "./IFood";

export class Food extends DrawableItem implements IFood
{
    protected readonly energy: number = 1;
    protected readonly color = [0, 200, 0];
    protected readonly image = "\u25B2";

    getEnergy(): number {
        return this.energy;
    }
}