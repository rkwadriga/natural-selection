import {IDrawer} from "./Drawer/IDrawer";
import {IField} from "./Field/IField";

export class Engine
{
    private readonly drawer: IDrawer;
    private readonly field: IField;

    constructor(drawer: IDrawer, field: IField)
    {
        this.drawer = drawer;
        this.field = field;
    }

    run(config: object): number
    {
        console.log('Hello again!');
        return 0;
    }
}