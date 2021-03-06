// cd home-projects/natural-selection/app/public/
// tsc app.ts && node app.js

import {ConsoleDrawer} from "./src/Drawer/ConsoleDrawer";
import {ConsoleField} from "./src/Field/ConsoleField";
import {Engine} from "./src/Engine";
import {Config} from "./src/Config";
import {ItemType} from "./src/Types/ItemType";

let config = new Config({
    width: 90,
    height: 40,
    foods: [
        {
            type: ItemType.FOOD,
            density: 0.2,
            reproductionSpeed: 3
        }
    ],
    bacterias: [
        {
            type: ItemType.EDIBLE_BACTERIA,
            count: 20
        },
        {
            type: ItemType.OMNIVOROUS_BACTERIA,
            count: 5,
        },
        {
            type: ItemType.PREDATORY_BACTERIA,
            count: 5
        }
    ],
    speed: 5,
    duration: 3600
});

let drawer = new ConsoleDrawer();
let field = new ConsoleField(config.width, config.height);

let engine = new Engine(drawer, field);
engine.run(config);