import {IDrawableItem} from "./IDrawableItem";

export interface IBacteria extends IDrawableItem
{
    canReproduce(): boolean;
    canMove(): boolean;
    canEat(): boolean;
    canLive(): boolean;
    reproduce(): IBacteria;
    move(): void;
    eat(food: IDrawableItem): boolean;
}