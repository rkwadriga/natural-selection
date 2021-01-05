import {IDrawableItem} from "./IDrawableItem";

export interface IDrawableItemFactory
{
    createDrawableItem(x1: number, y1: number, x0?: number, y0?: number): IDrawableItem;
}