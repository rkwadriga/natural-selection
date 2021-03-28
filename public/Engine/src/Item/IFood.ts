import {IDrawableItem} from "./IDrawableItem";

export interface IFood extends IDrawableItem
{
    getEnergy(): number;
}