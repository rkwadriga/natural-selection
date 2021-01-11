"use strict";
exports.__esModule = true;
exports.ItemService = void 0;
var FoodFactory_1 = require("../Item/FoodFactory");
var EdibleBacteriaFactory_1 = require("../Item/EdibleBacteriaFactory");
var PredatoryBacteriaFactory_1 = require("../Item/PredatoryBacteriaFactory");
var ItemType_1 = require("../Types/ItemType");
var ArrayHelper_1 = require("../Helpers/ArrayHelper");
var OmnivorousBacteriaFactory_1 = require("../Item/OmnivorousBacteriaFactory");
var ItemService = /** @class */ (function () {
    function ItemService(field) {
        this.field = field;
        this.foodFactory = new FoodFactory_1.FoodFactory();
        this.edibleBacteriaFactory = new EdibleBacteriaFactory_1.EdibleBacteriaFactory();
        this.predatoryBacteriaFactory = new PredatoryBacteriaFactory_1.PredatoryBacteriaFactory();
        this.omnivorousBacteriaFactory = new OmnivorousBacteriaFactory_1.OmnivorousBacteriaFactory();
        this.itemsTmpCount = [];
        this.fieldSquare = field.getWidth() * field.getHeight();
    }
    ItemService.prototype.getFactory = function (type) {
        switch (type) {
            case ItemType_1.ItemType.FOOD:
                return this.foodFactory;
            case ItemType_1.ItemType.EDIBLE_BACTERIA:
                return this.edibleBacteriaFactory;
            case ItemType_1.ItemType.PREDATORY_BACTERIA:
                return this.predatoryBacteriaFactory;
            case ItemType_1.ItemType.OMNIVOROUS_BACTERIA:
                return this.omnivorousBacteriaFactory;
        }
    };
    ItemService.prototype.generateItemsAndAddThemToField = function (params) {
        // Calculate foods count
        if (params['count'] === undefined) {
            params['count'] = this.field.getWidth() * this.field.getHeight() * params['density'];
        }
        var type = params['type'];
        var count = params['count'];
        if (count < 1) {
            if (this.itemsTmpCount[type] === undefined) {
                this.itemsTmpCount[type] = 0;
            }
            if (this.itemsTmpCount[type] + count >= 1) {
                count = 1;
                this.itemsTmpCount[type] = 0;
            }
            else {
                this.itemsTmpCount[type] += count;
                return;
            }
        }
        if (count > this.fieldSquare) {
            return;
        }
        for (var i = 0; i < count; i++) {
            var item = void 0;
            var hasItem = true;
            while (hasItem) {
                item = this.getFactory(type).createDrawableItem(ArrayHelper_1.ArrayHelper.merge({
                    field: this.field,
                    x1: this.field.getWidth(),
                    y1: this.field.getHeight()
                }, params));
                hasItem = this.field.getItem(item.getCoordinates()) !== null;
            }
            this.field.addItem(item);
            this.fieldSquare--;
        }
    };
    ItemService.prototype.moveBacteria = function (bacteria) {
        if (!bacteria.canLive()) {
            this.field.removeItem(bacteria);
            this.fieldSquare++;
            return;
        }
        if (!bacteria.canMove()) {
            return;
        }
        // Remember bacteria old coordinates
        var oldCoordinates = bacteria.getCoordinates();
        // Move bactria
        bacteria.move();
        // Check if there is something edible in the bacteria's place after step. And make bacteria to eat it
        this.feedBacteria(bacteria);
        // If bacteria moved - remove it from the old place and add to the new one
        if (oldCoordinates !== bacteria.getCoordinates()) {
            this.field.moveItem(oldCoordinates, bacteria.getCoordinates());
        }
    };
    ItemService.prototype.feedBacteria = function (bacteria) {
        var item = this.field.getItem(bacteria.getCoordinates());
        if (item !== null && bacteria.canEat(item)) {
            bacteria.eat(item);
            this.field.removeItem(item);
            this.fieldSquare++;
        }
    };
    ItemService.prototype.reproduceBacteria = function (bacteria) {
        if (!bacteria.canReproduce()) {
            return;
        }
        var newBacteria = bacteria.reproduce();
        if (newBacteria !== null) {
            // Check if there is something edible in the new bacteria's current place. And make bacteria to eat it
            this.feedBacteria(bacteria);
            this.field.addItem(newBacteria);
            this.fieldSquare--;
        }
    };
    return ItemService;
}());
exports.ItemService = ItemService;
