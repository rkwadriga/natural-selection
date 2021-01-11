"use strict";
exports.__esModule = true;
exports.FieldHelper = void 0;
var MathHelper_1 = require("./MathHelper");
var Direction_1 = require("../Types/Direction");
var FieldHelper = /** @class */ (function () {
    function FieldHelper() {
    }
    FieldHelper.getRandomStartPosition = function (w, h) {
        var x = -1, y = -1;
        var border = MathHelper_1.MathHelper.randomInt(0, 3);
        var randomX = MathHelper_1.MathHelper.randomInt(0, w);
        var randomY = MathHelper_1.MathHelper.randomInt(0, h);
        switch (border) {
            case 0:
                y = randomY;
                break;
            case 1:
                x = randomX;
                break;
            case 2:
                x = w;
                y = randomY;
                break;
            case 3:
                x = randomX;
                y = h;
                break;
        }
        return [x, y];
    };
    FieldHelper.getRandomStep = function (stepSize) {
        return [MathHelper_1.MathHelper.randomInt(0, stepSize), MathHelper_1.MathHelper.randomInt(0, stepSize)];
    };
    FieldHelper.getRandomPosition = function (w, h) {
        return [MathHelper_1.MathHelper.randomInt(0, w), MathHelper_1.MathHelper.randomInt(0, h)];
    };
    FieldHelper.makeAStep = function (x, y, deltaX, deltaY, direction) {
        if (deltaX === 0 && deltaY === 0) {
            return [x, y];
        }
        var newX = x;
        var newY = y;
        switch (direction) {
            case Direction_1.Direction.LEFT_TOP:
                newX = x - deltaX;
                newY = y - deltaY;
                break;
            case Direction_1.Direction.TOP:
                newY = y - deltaY;
                break;
            case Direction_1.Direction.RIGHT_TOP:
                newX = x + deltaX;
                newY = y - deltaY;
                break;
            case Direction_1.Direction.RIGHT:
                newX = x + deltaX;
                break;
            case Direction_1.Direction.RIGHT_DOWN:
                newX = x + deltaX;
                newY = y + deltaY;
                break;
            case Direction_1.Direction.DOWN:
                newY = y + deltaY;
                break;
            case Direction_1.Direction.LEFT_DOWN:
                newX = x - deltaX;
                newY = y + deltaY;
                break;
            case Direction_1.Direction.LEFT:
                newX = x - deltaX;
                break;
        }
        return [newX, newY];
    };
    FieldHelper.switchDirection = function (direction) {
        switch (direction) {
            case Direction_1.Direction.LEFT_TOP:
                return Direction_1.Direction.RIGHT_DOWN;
            case Direction_1.Direction.TOP:
                return Direction_1.Direction.DOWN;
            case Direction_1.Direction.RIGHT_TOP:
                return Direction_1.Direction.LEFT_DOWN;
            case Direction_1.Direction.RIGHT:
                return Direction_1.Direction.LEFT;
            case Direction_1.Direction.RIGHT_DOWN:
                return Direction_1.Direction.LEFT_TOP;
            case Direction_1.Direction.DOWN:
                return Direction_1.Direction.TOP;
            case Direction_1.Direction.LEFT_DOWN:
                return Direction_1.Direction.RIGHT_TOP;
            case Direction_1.Direction.LEFT:
                return Direction_1.Direction.RIGHT;
        }
    };
    FieldHelper.rotateDirection = function (direction) {
        switch (direction) {
            case Direction_1.Direction.LEFT_TOP:
                return Direction_1.Direction.TOP;
            case Direction_1.Direction.TOP:
                return Direction_1.Direction.RIGHT_TOP;
            case Direction_1.Direction.RIGHT_TOP:
                return Direction_1.Direction.RIGHT;
            case Direction_1.Direction.RIGHT:
                return Direction_1.Direction.RIGHT_DOWN;
            case Direction_1.Direction.RIGHT_DOWN:
                return Direction_1.Direction.DOWN;
            case Direction_1.Direction.DOWN:
                return Direction_1.Direction.LEFT_DOWN;
            case Direction_1.Direction.LEFT_DOWN:
                return Direction_1.Direction.LEFT;
            case Direction_1.Direction.LEFT:
                return Direction_1.Direction.LEFT_TOP;
        }
    };
    return FieldHelper;
}());
exports.FieldHelper = FieldHelper;
