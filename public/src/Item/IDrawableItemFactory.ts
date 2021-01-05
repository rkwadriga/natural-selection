import {IDrawableItem} from "./IDrawableItem";

export interface IDrawableItemFactory
{
    createDrawableItem(): IDrawableItem;
}