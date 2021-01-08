export class MathHelper
{
    public static randomInt(min: number, max: number): number
    {
        return min + Math.floor(Math.random() * (max + 1));
    }

    public static getDistance(x0: number, y0: number, x1: number, y1: number): number
    {
        return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    }
}