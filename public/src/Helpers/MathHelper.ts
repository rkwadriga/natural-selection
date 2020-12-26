export class MathHelper
{
    public static randomInt (min: number, max: number): number
    {
        return min + Math.floor(Math.random() * (max + 1));
    }
}