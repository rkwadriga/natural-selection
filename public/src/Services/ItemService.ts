import {FoodFactory} from "../Item/FoodFactory";
import {EdibleBacteriaFactory} from "../Item/EdibleBacteriaFactory";
import {PredatoryBacteriaFactory} from "../Item/PredatoryBacteriaFactory";
import {IDrawableItemFactory} from "../Item/IDrawableItemFactory";
import {ItemType} from "../Types/ItemType";
import {IField} from "../Field/IField";
import {IDrawableItem} from "../Item/IDrawableItem";
import {IBacteria} from "../Item/IBacteria";
import {ArrayHelper} from "../Helpers/ArrayHelper";

export class ItemService
{
    private readonly field: IField;
    private readonly foodFactory: FoodFactory;
    private readonly edibleBacteriaFactory: EdibleBacteriaFactory;
    private readonly predatoryBacteriaFactory: PredatoryBacteriaFactory;
    private readonly itemsTmpCount: Array<number>;

    constructor(field: IField)
    {
        this.field = field;
        this.foodFactory = new FoodFactory();
        this.edibleBacteriaFactory = new EdibleBacteriaFactory();
        this.predatoryBacteriaFactory = new PredatoryBacteriaFactory();
        this.itemsTmpCount = [];
    }

    getFactory(type: ItemType): IDrawableItemFactory
    {
        switch (type) {
            case ItemType.FOOD:
                return this.foodFactory;
            case ItemType.EDIBLE_BACTERIA:
                return this.edibleBacteriaFactory;
            case ItemType.PREDATORY_BACTERIA:
                return this.predatoryBacteriaFactory;
        }
    }

    generateItemsAndAddThemToField(params: object): void
    {
        let type = params['type'];
        let count = params['count'];
        if (count < 1) {
            if (this.itemsTmpCount[type] === undefined) {
                this.itemsTmpCount[type] = 0;
            }
            if (this.itemsTmpCount[type] + count >= 1) {
                count = 1;
                this.itemsTmpCount[type] = 0;
            } else {
                this.itemsTmpCount[type] += count;
                return;
            }
        }

        for (let i = 0; i < count; i++) {
            let item: IDrawableItem;
            let hasItem = true;
            while (hasItem) {
                item = this.getFactory(type).createDrawableItem(ArrayHelper.merge({
                    field: this.field,
                    x1: this.field.getWidth(),
                    y1: this.field.getHeight()
                }, params));
                hasItem = this.field.getItem(item.getCoordinates()) !== null;
            }
            this.field.addItem(item);
        }
    }

    moveBacteria(bactria: IBacteria): void
    {
        if (!bactria.canMove()) {
            return;
        }

        // Remember bacteria old coordinates
        let oldCoordinates = bactria.getCoordinates();
        // Move bactria
        bactria.move();
        // If bacteria moved - remove it from the old place and add to the new one
        if (oldCoordinates !== bactria.getCoordinates()) {
            this.field.moveItem(oldCoordinates, bactria.getCoordinates());
        }
    }

    feedBacteria(bacteria: IBacteria): void
    {
        let item = this.field.getItem(bacteria.getCoordinates());
        if (item !== null && bacteria.canEat(item)) {
            bacteria.eat(item);
            this.field.removeItem(item);
        }
    }
}