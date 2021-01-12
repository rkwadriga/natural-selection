import {DrawableItem} from "./DrawableItem";
import {IBacteria} from "./IBacteria";
import {Direction} from "../Types/Direction";
import {FieldHelper} from "../Helpers/FieldHelper";
import {IDrawableItem} from "./IDrawableItem";
import {Food} from "./Food";
import {IFood} from "./IFood";

export abstract class Bacteria extends DrawableItem implements IBacteria, IFood
{
    protected energy = 10;
    protected speed = 1;
    protected direction = Direction.LEFT_TOP;
    protected eatingCost = 1;
    protected movementCost = 0.05;
    protected reproduceCost = 2;
    protected reproduceMinEnergy: number;

    constructor(params: object) {
        super(params);
        if (this.reproduceMinEnergy === undefined) {
            this.reproduceMinEnergy = this.energy * 2;
        }
    }

    abstract canEat(item: IDrawableItem): boolean;

    abstract createClone(): Bacteria;

    getEnergy(): number {
        return this.energy;
    }

    canLive(): boolean {
        return this.energy > this.movementCost;
    }

    canMove(): boolean {
        return this.energy >= this.speed * this.movementCost;
    }

    canReproduce(): boolean {
        return this.energy >= this.reproduceMinEnergy;
    }

    eat(item: IDrawableItem): void {
        if (!this.canEat(item)) {
            return;
        }
        if (item instanceof Food || item instanceof Bacteria) {
            this.energy += item.getEnergy() * this.getEatingCost(item);
        }
    }

    move(): void {
        let newX: number, newY: number;
        let direction = this.direction;
        let nextItem: IDrawableItem;
        [newX, newY] = this.makeAStep(direction);
        // Check borders
        if (!this.checkBorders(newX, newY)) {
            direction = FieldHelper.switchDirection(direction);
        }
        // Check if item is afraid of next item
        nextItem = this.field.getItem(DrawableItem.createCoordinates(newX, newY));
        if (nextItem !== null && this.isAfraid(nextItem)) {
            direction = FieldHelper.switchDirection(direction);
        }

        for (let i = 0; i < 8; i++) {
            [newX, newY] = this.makeAStep(direction);
            if (this.canGo(newX, newY)) {
                this.energy -= this.getMovementCost(newX, newY);
                this.direction = direction;
                [this.x, this.y] = [newX, newY];
                return;
            }
            direction = FieldHelper.rotateDirection(direction);
        }
        this.energy -= this.getMovementCost(this.x, this.y);
    }

    reproduce(): IBacteria {
        let clone = this.createClone();
        clone.move();
        if (clone.getCoordinates() === this.getCoordinates()) {
            return null;
        }
        this.energy -= clone.getEnergy();
        return clone;
    }

    protected canGo(newX: number, newY: number): boolean {
        if (!this.checkBorders(newX, newY)) {
            return false;
        }
        let nextItem = this.field.getItem(DrawableItem.createCoordinates(newX, newY));
        return nextItem === null || this.canEat(nextItem);
    }

    protected isAfraid(item: IDrawableItem): boolean {
        return false;
    }

    protected makeAStep(direction: Direction): Array<number> {
        let deltaX: number, deltaY: number;
        [deltaX, deltaY] = FieldHelper.getRandomStep(this.speed);
        return  FieldHelper.makeAStep(this.x, this.y, deltaX, deltaY, direction);
    }

    protected checkBorders(newX: number, newY: number): boolean {
        return newX >= 0 && newX < this.field.getWidth() && newY >= 0 && newY < this.field.getHeight();
    }

    protected getMovementCost(newX: number, newY: number): number {
        let distance = Math.sqrt(Math.pow(this.x - newX, 2) + Math.pow(this.y - newY, 2));
        return distance > 0 ? this.speed * this.movementCost * distance : this.movementCost;
    }

    protected getEatingCost(item: IDrawableItem): number {
        return this.eatingCost;
    }

    protected getCloneParams(): object {
        return {
            type: this.type,
            field: this.field,
            x: this.x,
            y: this.y,
            energy: (this.energy - this.reproduceCost) / 2,
            eatingCost: this.eatingCost,
            movementCost: this.movementCost,
            reproduceCost: this.reproduceCost,
            reproduceMinEnergy: this.reproduceMinEnergy
        };
    }
}