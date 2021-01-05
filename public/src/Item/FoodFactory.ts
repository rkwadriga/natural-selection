import {IDrawableItemFactory} from "./IDrawableItemFactory";
import {Food} from "./Food";

export class FoodFactory implements IDrawableItemFactory
{
    createDrawableItem(): Food {
        return undefined;
    }
}