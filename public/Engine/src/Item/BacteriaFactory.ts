import {ItemFactory} from "./ItemFactory";
import {FieldHelper} from "../Helpers/FieldHelper";

export abstract class BacteriaFactory extends ItemFactory
{
    protected getRandomPosition(x0: number, y0: number, x1: number, y1: number): Array<number> {
        return FieldHelper.getRandomStartPosition(x1 - x0, y1 - y0);
    }
}