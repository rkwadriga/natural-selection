"use strict";
exports.__esModule = true;
exports.Engine = void 0;
var ItemService_1 = require("./Services/ItemService");
var Engine = /** @class */ (function () {
    function Engine(drawer, field) {
        this.drawer = drawer;
        this.field = field;
        this.itemService = new ItemService_1.ItemService(field);
    }
    Engine.prototype.run = function (config) {
        var _this = this;
        this.config = config;
        // Create food and bacterias and add them to the field
        config.foods.forEach(function (params) {
            _this.itemService.generateItemsAndAddThemToField(params);
        });
        config.bacterias.forEach(function (params) {
            _this.itemService.generateItemsAndAddThemToField(params);
        });
        // Prepare statistics items
        var statisticsItems = this.config.foods;
        this.config.bacterias.forEach(function (params) {
            statisticsItems.push(params);
        });
        // Draw the start position of field
        this.drawer.viewField(this.field);
        // Run the game!
        var time = 0;
        var period = 1000 / config.speed;
        var interval = setInterval(function () {
            // Clear console
            console.clear();
            // Make all creatures to move
            _this.iterate();
            _this.drawer.viewField(_this.field);
            _this.drawer.viewStatistics(_this.field, statisticsItems);
            _this.drawer.draw();
            // Stop the process when the time is run out
            if ((time += period) >= config.duration * 1000) {
                clearInterval(interval);
            }
        }, period);
        return 0;
    };
    Engine.prototype.iterate = function () {
        var _this = this;
        // Move edible and predatory bacterias
        this.config.bacterias.forEach(function (params) {
            _this.field.getItems(params['type']).forEach(function (bacteria) {
                _this.itemService.moveBacteria(bacteria);
                _this.itemService.reproduceBacteria(bacteria);
            });
        });
        // Reproduce foods
        this.config.foods.forEach(function (params) {
            _this.itemService.generateItemsAndAddThemToField({ type: params['type'], count: params['reproductionSpeed'] });
        });
    };
    return Engine;
}());
exports.Engine = Engine;
