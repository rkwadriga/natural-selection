import {IDrawer} from "./Drawer/IDrawer";
import {IField} from "./Field/IField";
import {ItemService} from "./Services/ItemService";
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
        config.foods.forEach(params => {
            this.itemService.generateItemsAndAddThemToField(params);
        });
        config.bacterias.forEach(params => {
            this.itemService.generateItemsAndAddThemToField(params);
        });

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
            this.drawer.viewStatistics(this.field, this.config.bacterias);

            // Stop the process when the time is run out
            if ((time += period) >=config.duration * 1000) {
                clearInterval(interval);
            }
        }, period);

        return 0;
    }

    private iterate() {
        // Move edible and predatory bacterias
        this.config.bacterias.forEach(params => {
            this.field.getItems(params['type']).forEach((bacteria: IBacteria) => {
                this.itemService.moveBacteria(bacteria);
                this.itemService.reproduceBacteria(bacteria);
            });
        });

        // Reproduce foods
        this.config.foods.forEach(params => {
            this.itemService.generateItemsAndAddThemToField({type: params['type'], count: params['reproductionSpeed']});
        });
    }
}