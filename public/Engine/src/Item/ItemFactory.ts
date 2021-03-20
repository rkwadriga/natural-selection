import {IDrawableItemFactory} from "./IDrawableItemFactory";
import {FieldHelper} from "../Helpers/FieldHelper";
import {IDrawableItem} from "./IDrawableItem";

export abstract class ItemFactory implements IDrawableItemFactory
{
    abstract  createDrawableItem(params: object): IDrawableItem;

    protected initParams(params: object): void {
        if (params['x'] !== undefined && params['y'] !== undefined) {
            return;
        }
        let x: number, y: number;
        let x0 = params['x0'] !== undefined ? params['x0'] : 0;
        let x1 = params['x1'] !== undefined ? params['x1'] : 0;
        let y0 = params['y0'] !== undefined ? params['y0'] : 0;
        let y1 = params['y1'] !== undefined ? params['y1'] : 0;
        [x, y] = this.getRandomPosition(x0, y0, x1, y1);
        if (params['x'] === undefined) {
            params['x'] = x;
        }
        if (params['y'] === undefined) {
            params['y'] = y;
        }
    }

    protected getRandomPosition(x0: number, y0: number, x1: number, y1: number): Array<number> {
        return FieldHelper.getRandomPosition(x1 - x0 - 1, y1 - y0 - 1);
    }
}