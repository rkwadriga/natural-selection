import {IDrawableItemFactory} from "./IDrawableItemFactory";
import {Food} from "./Food";
import {FieldHelper} from "../Helpers/FieldHelper";

export class FoodFactory implements IDrawableItemFactory
{
    createDrawableItem(x1: number, y1: number, x0 = 0, y0 = 0): Food {
        let position = FieldHelper.getRandomPosition(x1 - x0, y1 - y0);
        return new Food(position[0], position[1]);
    }
}