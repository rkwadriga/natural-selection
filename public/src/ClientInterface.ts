import {FieldInterface} from "./FieldInterface";

export interface ClientInterface
{
    drawField(): void;
    getField(): FieldInterface;
}