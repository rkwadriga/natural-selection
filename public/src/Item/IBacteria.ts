import {IDrawableItem} from "./IDrawableItem";
import {IFood} from "./IFood";

export interface IBacteria extends IDrawableItem
{
    canReproduce(): boolean;
    canMove(): boolean;
    canEat(): boolean;
    canLive(): boolean;
    reproduce(): IBacteria;
    move(): void;
    eat(food: IFood): void;
}