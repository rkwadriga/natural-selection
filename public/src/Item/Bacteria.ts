import {DrawableItem} from "./DrawableItem";
import {IBacteria} from "./IBacteria";
import {IFood} from "./IFood";

export class Bacteria extends DrawableItem implements IBacteria
{
    protected energy: number;

    constructor(x: number, y: number, color = [0, 0, 0], image: "", energy = 10)
    {
        super(x, y, color, image);
        this.energy = energy;
    }

    canEat(): boolean {
        return false;
    }

    canLive(): boolean {
        return false;
    }

    canMove(): boolean {
        return false;
    }

    canReproduce(): boolean {
        return false;
    }

    eat(food: IFood): void {
    }

    move(): void {
    }

    reproduce(): IBacteria {
        return null;
    }
}