// tsc app.ts && node app.js

import {ConsoleDrawer} from "./src/Drawer/ConsoleDrawer";
import {ConsoleField} from "./src/Field/ConsoleField";
import {Engine} from "./src/Engine";
import {Config} from "./src/Config";

let config = new Config({
    width: 30,
    height: 15,
    foodCount: 0,
    edibleBacteriaCount: 20,
    predatoryBacteriaCount: 0,
    speed: 10,
    duration: 120
});

let drawer = new ConsoleDrawer();
let field = new ConsoleField(config.width, config.height);

let engine = new Engine(drawer, field);
engine.run(config);