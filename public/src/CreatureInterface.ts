import {FieldInterface} from "./FieldInterface";

export interface CreatureInterface {
    setField(field: FieldInterface): void;
    getX(): number;
    getY(): number;
    move(): void;
    setCoordinates(coordinates: string): void;
    getCoordinates(): string;
    getColor(): Array<number>;
};