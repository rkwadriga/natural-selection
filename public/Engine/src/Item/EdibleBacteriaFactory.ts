import {EdibleBacteria} from "./EdibleBacteria";
import {BacteriaFactory} from "./BacteriaFactory";

export class EdibleBacteriaFactory extends BacteriaFactory
{
    createDrawableItem(params: object): EdibleBacteria {
        this.initParams(params);
        return new EdibleBacteria(params);
    }
}