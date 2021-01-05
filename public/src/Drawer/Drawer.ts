import {IDrawer} from "./IDrawer";
import {IField} from "../Field/IField";

export abstract class Drawer implements IDrawer
{
    abstract draw(field: IField): void;
}