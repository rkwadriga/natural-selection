// tsc app.ts && node app.js

import {ConsoleDrawer} from "./src/Drawer/ConsoleDrawer";
import {ConsoleField} from "./src/Field/ConsoleField";
import {Engine} from "./src/Engine";
import {Config} from "./src/Config";
import {ItemType} from "./src/Types/ItemType";

let config = new Config({
    width: 30,
    height: 15,
    foods: [
        {
            type: ItemType.FOOD,
            density: 0.2,
            reproductionSpeed: 1
        }
    ],
    bacterias: [
        {
            type: ItemType.EDIBLE_BACTERIA,
            count: 10
        },
        {
            type: ItemType.PREDATORY_BACTERIA,
            count: 3
        }
    ],
    speed: 5,
    duration: 600
});

let drawer = new ConsoleDrawer();
let field = new ConsoleField(config.width, config.height);

let engine = new Engine(drawer, field);
engine.run(config);