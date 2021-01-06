import {DrawableItem} from "./DrawableItem";
import {IBacteria} from "./IBacteria";
import {IFood} from "./IFood";
import {ItemType} from "../Types/ItemType";
import {HorizontalDirection} from "../Types/HorizontalDirection";
import {VerticalDirection} from "../Types/VerticalDirection";
import {IField} from "../Field/IField";
import {FieldHelper} from "../Helpers/FieldHelper";

export class Bacteria extends DrawableItem implements IBacteria
{
    protected energy: number;
    protected readonly speed: number;
    protected verticalDirection: VerticalDirection;
    protected horizontalDirection: HorizontalDirection;

    constructor(field: IField, x: number, y: number, color = [255, 0, 0], image = "\u2B24", energy = 10, speed = 1, type?: ItemType)
    {
        super(field, x, y, color, image, type);
        this.energy = energy;
        this.speed = speed;
        this.verticalDirection = VerticalDirection.TOP;
        this.horizontalDirection = HorizontalDirection.RIGHT;
    }

    canEat(): boolean {
        return true;
    }

    canLive(): boolean {
        return this.energy > 0;
    }

    canMove(): boolean {
        return this.energy > 0;
    }

    canReproduce(): boolean {
        return true;
    }

    eat(food: IFood): void {
        this.energy += food.getEnergy();
    }

    move(): void {
        let deltaX: number, deltaY: number, newX: number, newY: number;
        [deltaX, deltaY] = FieldHelper.getRandomStep(this.getX(), this.getY(), this.field.getWidth(), this.field.getHeight(), this.speed);
        [newX, newY] = FieldHelper.move(this.getX(), this.getY(), deltaX, deltaY, this.horizontalDirection, this.verticalDirection);
        if (!this.canGo(newX, newY)) {
            let newHorizontalDirection: HorizontalDirection, newVerticalDirection: VerticalDirection;
            [newHorizontalDirection, newVerticalDirection] = FieldHelper.switchDirection(this.horizontalDirection, this.verticalDirection);
            if (FieldHelper.isHorizontalDirectionCorrect(newX, newY, this.horizontalDirection, this.field.getWidth(), this.field.getHeight())) {
                this.verticalDirection = newVerticalDirection;
            } else {
                this.horizontalDirection = newHorizontalDirection;
            }
        }
        [this.x, this.y] = FieldHelper.move(this.getX(), this.getY(), deltaX, deltaY, this.horizontalDirection, this.verticalDirection);
    }

    reproduce(): IBacteria {
        return null;
    }

    protected canGo(newX: number, newY: number): boolean
    {
        let item = this.field.getItem(DrawableItem.createCoordinates(newX, newY));
        if (item !== null && item.getType() !== ItemType.FOOD) {
            return false;
        }
        return FieldHelper.isHorizontalDirectionCorrect(newX, newY, this.horizontalDirection, this.field.getWidth(), this.field.getHeight())
            && FieldHelper.isVerticalDirectionCorrect(newX, newY, this.verticalDirection, this.field.getWidth(), this.field.getHeight());
    }
}