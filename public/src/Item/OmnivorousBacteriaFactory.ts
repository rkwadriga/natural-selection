import {BacteriaFactory} from "./BacteriaFactory";
import {OmnivorousBacteria} from "./OmnivorousBacteria";

export class OmnivorousBacteriaFactory extends BacteriaFactory
{
    createDrawableItem(params: object): OmnivorousBacteria {
        this.initParams(params);
        return new OmnivorousBacteria(params);
    }
}