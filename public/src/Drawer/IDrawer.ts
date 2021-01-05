import {IField} from "../Field/IField";

export interface IDrawer
{
    draw(field: IField): void;
}