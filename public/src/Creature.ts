import {CreatureInterface} from "./CreatureInterface";
import {MathHelper} from "./Helpers/MathHelper";
import {FieldInterface} from "./FieldInterface";

enum VerticalDirection {Up, Down}
enum HorizontalDirection {Left, Right}

export class Creature implements CreatureInterface
{
    private field: FieldInterface;
    private fieldWidth: number;
    private fieldHeight: number;
    private x: number;
    private y: number;
    private coordinates: string;
    private verticalDirection: VerticalDirection;
    private horizontalDirection: HorizontalDirection;

    constructor(x: number, y: number)
    {
        this.fieldWidth = 0;
        this.fieldHeight = 0;
        this.x = x;
        this.y = y;
        this.verticalDirection = VerticalDirection.Down;
        this.horizontalDirection = HorizontalDirection.Right;
    }

    public setField(field: FieldInterface): void
    {
        this.field = field;
        this.fieldWidth = field.getWidth();
        this.fieldHeight = field.getHeight();
    }

    public getX(): number
    {
        return this.x;
    }

    public getY(): number
    {
        return this.y;
    }

    public move(): void
    {
        let x = MathHelper.randomInt(0, 1);
        let y = MathHelper.randomInt(0, 1);
        this.checkDirection(x, y);

        switch (this.verticalDirection) {
            case VerticalDirection.Down:
                this.x += x;
                break;
            case VerticalDirection.Up:
                this.x -= x;
                break;
        }
        switch (this.horizontalDirection) {
            case HorizontalDirection.Right:
                this.y += y;
                break;
            case HorizontalDirection.Left:
                this.y -= y;
                break;
        }
    }

    public setCoordinates(coordinates: string): void
    {
        this.coordinates = coordinates;
    }

    public getCoordinates(): string
    {
        return this.coordinates;
    }

    public getColor(): Array<number>
    {
        return [255, 0, 0];
    }

    private checkDirection(x: number, y: number): void
    {
        let newX: number;
        let newY: number;
        switch (this.verticalDirection) {
            case VerticalDirection.Down:
                newX = this.x + x;
                break;
            case VerticalDirection.Up:
                newX = this.x - x;
                break;
        }
        switch (this.horizontalDirection) {
            case HorizontalDirection.Right:
                newY = this.y + y;
                break;
            case HorizontalDirection.Left:
                newY = this.y - y;
                break;
        }
        let hasCreature = this.field.hasCreature(newX, newY);

        switch (this.verticalDirection) {
            case VerticalDirection.Down:
                if (newX >= this.fieldWidth - 1 || hasCreature) {
                    this.verticalDirection = VerticalDirection.Up;
                }
                break;
            case VerticalDirection.Up:
                if (newX < 0 || hasCreature) {
                    this.verticalDirection = VerticalDirection.Down;
                }
                break;
        }
        switch (this.horizontalDirection) {
            case HorizontalDirection.Right:
                if (newY >= this.fieldHeight - 1 || hasCreature) {
                    this.horizontalDirection = HorizontalDirection.Left;
                }
                break;
            case HorizontalDirection.Left:
                if (newY < 0 || hasCreature) {
                    this.horizontalDirection = HorizontalDirection.Right;
                }
                break;
        }
    }
}