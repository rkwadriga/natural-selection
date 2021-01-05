// tsc app.ts && node app.js

import {ConsoleDrawer} from "./src/Drawer/ConsoleDrawer";
import {ConsoleField} from "./src/Field/ConsoleField";
import {Engine} from "./src/Engine";

let config = {

};

let drawer = new ConsoleDrawer();
let field = new ConsoleField(30, 15);

let engine = new Engine(drawer, field);
engine.run(config);