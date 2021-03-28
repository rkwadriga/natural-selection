import {IDrawer} from "./IDrawer";
import {IField} from "../Field/IField";

export abstract class Drawer implements IDrawer
{
    abstract viewField(field: IField): void;

    abstract viewStatistics(field: IField, items: Array<object>);

    abstract draw(): void;
}