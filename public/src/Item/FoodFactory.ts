import {IDrawableItemFactory} from "./IDrawableItemFactory";
import {Food} from "./Food";
import {FieldHelper} from "../Helpers/FieldHelper";
import {IField} from "../Field/IField";

export class FoodFactory implements IDrawableItemFactory
{
    private readonly field: IField;

    constructor(field: IField) {
        this.field = field;
    }

    createDrawableItem(x1: number, y1: number, x0 = 0, y0 = 0): Food {
        let position = FieldHelper.getRandomPosition(x1 - x0 - 1, y1 - y0 - 1);
        return new Food(this.field, position[0], position[1]);
    }
}