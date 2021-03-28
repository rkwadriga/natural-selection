import {IField} from "../Field/IField";

export interface IDrawer
{
    viewField(field: IField): void;

    viewStatistics(field: IField, items: Array<object>): void;

    draw(): void;
}