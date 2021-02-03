"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Bacteria = void 0;
var DrawableItem_1 = require("./DrawableItem");
var Direction_1 = require("../Types/Direction");
var FieldHelper_1 = require("../Helpers/FieldHelper");
var Food_1 = require("./Food");
var Bacteria = /** @class */ (function (_super) {
    __extends(Bacteria, _super);
    function Bacteria(params) {
        var _this = _super.call(this, params) || this;
        _this.energy = 10;
        _this.speed = 1;
        _this.direction = Direction_1.Direction.LEFT_TOP;
        _this.eatingCost = 1;
        _this.movementCost = 0.05;
        _this.reproduceCost = 2;
        if (_this.reproduceMinEnergy === undefined) {
            _this.reproduceMinEnergy = _this.energy * 2;
        }
        return _this;
    }
    Bacteria.prototype.getEnergy = function () {
        return this.energy;
    };
    Bacteria.prototype.canLive = function () {
        return this.energy > this.movementCost;
    };
    Bacteria.prototype.canMove = function () {
        return this.energy >= this.speed * this.movementCost;
    };
    Bacteria.prototype.canReproduce = function () {
        return this.energy >= this.reproduceMinEnergy;
    };
    Bacteria.prototype.eat = function (item) {
        if (!this.canEat(item)) {
            return;
        }
        if (item instanceof Food_1.Food || item instanceof Bacteria) {
            this.energy += item.getEnergy() * this.getEatingCost(item);
        }
    };
    Bacteria.prototype.move = function () {
        var _a, _b, _c;
        var newX, newY;
        var direction = this.direction;
        var nextItem;
        _a = this.makeAStep(direction), newX = _a[0], newY = _a[1];
        // Check borders
        if (!this.checkBorders(newX, newY)) {
            direction = FieldHelper_1.FieldHelper.switchDirection(direction);
        }
        // Check if item is afraid of next item
        nextItem = this.field.getItem(DrawableItem_1.DrawableItem.createCoordinates(newX, newY));
        if (nextItem !== null && this.isAfraid(nextItem)) {
            direction = FieldHelper_1.FieldHelper.switchDirection(direction);
        }
        for (var i = 0; i < 8; i++) {
            _b = this.makeAStep(direction), newX = _b[0], newY = _b[1];
            if (this.canGo(newX, newY)) {
                this.energy -= this.getMovementCost(newX, newY);
                this.direction = direction;
                _c = [newX, newY], this.x = _c[0], this.y = _c[1];
                return;
            }
            direction = FieldHelper_1.FieldHelper.rotateDirection(direction);
        }
        this.energy -= this.getMovementCost(this.x, this.y);
    };
    Bacteria.prototype.reproduce = function () {
        var clone = this.createClone();
        clone.move();
        if (clone.getCoordinates() === this.getCoordinates()) {
            return null;
        }
        this.energy -= clone.getEnergy();
        return clone;
    };
    Bacteria.prototype.canGo = function (newX, newY) {
        if (!this.checkBorders(newX, newY)) {
            return false;
        }
        var nextItem = this.field.getItem(DrawableItem_1.DrawableItem.createCoordinates(newX, newY));
        return nextItem === null || this.canEat(nextItem);
    };
    Bacteria.prototype.isAfraid = function (item) {
        return false;
    };
    Bacteria.prototype.makeAStep = function (direction) {
        var _a;
        var deltaX, deltaY;
        _a = FieldHelper_1.FieldHelper.getRandomStep(this.speed), deltaX = _a[0], deltaY = _a[1];
        return FieldHelper_1.FieldHelper.makeAStep(this.x, this.y, deltaX, deltaY, direction);
    };
    Bacteria.prototype.checkBorders = function (newX, newY) {
        return newX >= 0 && newX < this.field.getWidth() && newY >= 0 && newY < this.field.getHeight();
    };
    Bacteria.prototype.getMovementCost = function (newX, newY) {
        var distance = Math.sqrt(Math.pow(this.x - newX, 2) + Math.pow(this.y - newY, 2));
        return distance > 0 ? this.speed * this.movementCost * distance : this.movementCost;
    };
    Bacteria.prototype.getEatingCost = function (item) {
        return this.eatingCost;
    };
    Bacteria.prototype.getCloneParams = function () {
        return {
            type: this.type,
            field: this.field,
            x: this.x,
            y: this.y,
            energy: (this.energy - this.reproduceCost) / 2,
            eatingCost: this.eatingCost,
            movementCost: this.movementCost,
            reproduceCost: this.reproduceCost,
            reproduceMinEnergy: this.reproduceMinEnergy
        };
    };
    return Bacteria;
}(DrawableItem_1.DrawableItem));
exports.Bacteria = Bacteria;
