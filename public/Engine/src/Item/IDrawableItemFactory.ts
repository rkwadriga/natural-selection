import {IDrawableItem} from "./IDrawableItem";

export interface IDrawableItemFactory
{
    createDrawableItem(params: object): IDrawableItem;
}