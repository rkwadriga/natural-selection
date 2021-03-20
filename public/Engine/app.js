"use strict";
// cd home-projects/natural-selection/app/public/
// tsc app.ts && node app.js
exports.__esModule = true;
var ConsoleDrawer_1 = require("./Engine/Drawer/ConsoleDrawer");
var ConsoleField_1 = require("./Engine/Field/ConsoleField");
var Engine_1 = require("./Engine/Engine");
var Config_1 = require("./Engine/Config");
var ItemType_1 = require("./Engine/Types/ItemType");
var config = new Config_1.Config({
    width: 90,
    height: 40,
    foods: [
        {
            type: ItemType_1.ItemType.FOOD,
            density: 0.2,
            reproductionSpeed: 3
        }
    ],
    bacterias: [
        {
            type: ItemType_1.ItemType.EDIBLE_BACTERIA,
            count: 20
        },
        {
            type: ItemType_1.ItemType.OMNIVOROUS_BACTERIA,
            count: 5
        },
        {
            type: ItemType_1.ItemType.PREDATORY_BACTERIA,
            count: 5
        }
    ],
    speed: 5,
    duration: 3600
});
var drawer = new ConsoleDrawer_1.ConsoleDrawer();
var field = new ConsoleField_1.ConsoleField(config.width, config.height);
var engine = new Engine_1.Engine(drawer, field);
engine.run(config);
