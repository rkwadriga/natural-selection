export interface CreatureInterface {
    getX(): number;
    getY(): number;
    move(): void;
    setCoordinates(coordinates: string): void;
    getCoordinates(): string;
};