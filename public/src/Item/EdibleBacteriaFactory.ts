import {EdibleBacteria} from "./EdibleBacteria";
import {BacteriaFactory} from "./BacteriaFactory";
import {FieldHelper} from "../Helpers/FieldHelper";

export class EdibleBacteriaFactory extends BacteriaFactory
{
    createDrawableItem(x1: number, y1: number, x0 = 0, y0 = 0): EdibleBacteria {
        let position = FieldHelper.getRandomStartPosition(x1 - x0, y1 - y0);
        return new EdibleBacteria(position[0], position[1]);
    }
}