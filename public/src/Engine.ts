import {IDrawer} from "./Drawer/IDrawer";
import {IField} from "./Field/IField";
import {ItemService} from "./Services/ItemService";
import {ItemType} from "./Item/ItemType";
import {Config} from "./Config";

export class Engine
{
    private readonly drawer: IDrawer;
    private readonly field: IField;
    private readonly itemService: ItemService;

    constructor(drawer: IDrawer, field: IField)
    {
        this.drawer = drawer;
        this.field = field;
        this.itemService = new ItemService();
    }

    run(config: Config): number
    {
        // Create food and bacterias and add them to the field
        this.itemService.generateItemsAndAddThemToField(this.field, ItemType.FOOD, config.foodCount);
        this.itemService.generateItemsAndAddThemToField(this.field, ItemType.EDIBLE_BACTERIA, config.edibleBacteriaCount);
        this.itemService.generateItemsAndAddThemToField(this.field, ItemType.PREDATORY_BACTERIA, config.predatoryBacteriaCount);

        console.log(this.field.getItems(ItemType.EDIBLE_BACTERIA));

        return 0;
    }
}