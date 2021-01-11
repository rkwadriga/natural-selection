import {MathHelper} from "./MathHelper";
import {Direction} from "../Types/Direction";

export class FieldHelper
{
    public static getRandomStartPosition(w: number, h: number): Array<number>
    {
        let x = -1, y = -1;
        let border = MathHelper.randomInt(0, 3);
        let randomX = MathHelper.randomInt(0, w);
        let randomY = MathHelper.randomInt(0, h);

        switch (border) {
            case 0:
                y = randomY;
                break;
            case 1:
                x = randomX;
                break;
            case 2:
                x = w;
                y = randomY;
                break;
            case 3:
                x = randomX;
                y = h;
                break;
        }

        return [x, y];
    }

    public static getRandomStep(stepSize: number): Array<number>
    {
        return [MathHelper.randomInt(0, stepSize), MathHelper.randomInt(0, stepSize)];
    }

    public static getRandomPosition(w: number, h: number): Array<number>
    {
        return [MathHelper.randomInt(0, w), MathHelper.randomInt(0, h)];
    }

    public static makeAStep(x: number, y: number, deltaX: number, deltaY: number, direction: Direction): Array<number>
    {
        if (deltaX === 0 && deltaY === 0) {
            return [x, y];
        }
        let newX = x; let newY = y;
        switch (direction) {
            case Direction.LEFT_TOP:
                newX = x - deltaX;
                newY = y - deltaY;
                break;
            case Direction.TOP:
                newY = y - deltaY;
                break;
            case Direction.RIGHT_TOP:
                newX = x + deltaX;
                newY = y - deltaY;
                break;
            case Direction.RIGHT:
                newX = x + deltaX;
                break;
            case Direction.RIGHT_DOWN:
                newX = x + deltaX;
                newY = y + deltaY;
                break;
            case Direction.DOWN:
                newY = y + deltaY;
                break;
            case Direction.LEFT_DOWN:
                newX = x - deltaX;
                newY = y + deltaY;
                break;
            case Direction.LEFT:
                newX = x - deltaX;
                break;
        }
        return [newX, newY];
    }

    public static switchDirection(direction: Direction): Direction
    {
        switch (direction) {
            case Direction.LEFT_TOP:
                return Direction.RIGHT_DOWN;
            case Direction.TOP:
                return Direction.DOWN;
            case Direction.RIGHT_TOP:
                return Direction.LEFT_DOWN;
            case Direction.RIGHT:
                return Direction.LEFT;
            case Direction.RIGHT_DOWN:
                return Direction.LEFT_TOP;
            case Direction.DOWN:
                return Direction.TOP;
            case Direction.LEFT_DOWN:
                return Direction.RIGHT_TOP;
            case Direction.LEFT:
                return Direction.RIGHT;
        }
    }

    public static rotateDirection(direction: Direction): Direction
    {
        switch (direction) {
            case Direction.LEFT_TOP:
                return Direction.TOP;
            case Direction.TOP:
                return Direction.RIGHT_TOP;
            case Direction.RIGHT_TOP:
                return Direction.RIGHT;
            case Direction.RIGHT:
                return Direction.RIGHT_DOWN;
            case Direction.RIGHT_DOWN:
                return Direction.DOWN;
            case Direction.DOWN:
                return Direction.LEFT_DOWN;
            case Direction.LEFT_DOWN:
                return Direction.LEFT;
            case Direction.LEFT:
                return Direction.LEFT_TOP;
        }
    }
}