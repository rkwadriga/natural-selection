import {DrawableItem} from "./DrawableItem";
import {IFood} from "./IFood";

export class Food extends DrawableItem implements IFood
{
    protected energy = 2;
    protected color = [0, 200, 0];
    protected image = "\u25B2";
    protected name = "Food";

    getEnergy(): number {
        return this.energy;
    }
}