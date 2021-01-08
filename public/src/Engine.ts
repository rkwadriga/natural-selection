import {IDrawer} from "./Drawer/IDrawer";
import {IField} from "./Field/IField";
import {ItemService} from "./Services/ItemService";
import {ItemType} from "./Types/ItemType";
import {Config} from "./Config";
import {IBacteria} from "./Item/IBacteria";

export class Engine
{
    private readonly drawer: IDrawer;
    private readonly field: IField;
    private readonly itemService: ItemService;
    private config: Config;

    constructor(drawer: IDrawer, field: IField)
    {
        this.drawer = drawer;
        this.field = field;
        this.itemService = new ItemService(field);
    }

    run(config: Config): number
    {
        this.config = config;

        // Create food and bacterias and add them to the field
        this.itemService.generateItemsAndAddThemToField(ItemType.FOOD, config.foodCount);
        this.itemService.generateItemsAndAddThemToField(ItemType.EDIBLE_BACTERIA, config.edibleBacteriaCount);
        this.itemService.generateItemsAndAddThemToField(ItemType.PREDATORY_BACTERIA, config.predatoryBacteriaCount);

        // Draw the start position of field
        this.drawer.draw(this.field);

        // Run the game!
        let time = 0;
        let period = 1000 / config.speed;

        let interval = setInterval(() => {
            // Clear console
            console.clear();

            // Make all creatures to move
            this.iterate();
            this.drawer.draw(this.field);

            // Stop the process when the time is run out
            if ((time += period) >=config.duration * 1000) {
                clearInterval(interval);
            }
        }, period);

        return 0;
    }

    private iterate() {
        //console.log(this.field.getItems(ItemType.EDIBLE_BACTERIA));
        // Move edible bacterias
        this.moveBacterias(ItemType.EDIBLE_BACTERIA);
        // Move predatory bacterias
        this.moveBacterias(ItemType.PREDATORY_BACTERIA);
        // Reproduce food
        this.itemService.generateItemsAndAddThemToField(ItemType.FOOD, this.config.foodReproductionSpeed);
    }

    private moveBacterias(type: ItemType) {
        this.field.getItems(type).forEach((bacteria: IBacteria) => {
            this.itemService.moveBacteria(bacteria);
            if (!bacteria.canLive()) {
                this.field.removeItem(bacteria);
                return;
            }
            this.itemService.feedBacteria(bacteria);
        });
    }
}