import {Food} from "./Food";
import {ItemFactory} from "./ItemFactory";

export class FoodFactory extends ItemFactory
{
    createDrawableItem(params: object): Food {
        this.initParams(params);
        return new Food(params);
    }
}