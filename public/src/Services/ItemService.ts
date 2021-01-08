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
    private fieldSquare: number;

    constructor(field: IField)
    {
        this.field = field;
        this.foodFactory = new FoodFactory();
        this.edibleBacteriaFactory = new EdibleBacteriaFactory();
        this.predatoryBacteriaFactory = new PredatoryBacteriaFactory();
        this.itemsTmpCount = [];
        this.fieldSquare = field.getWidth() * field.getHeight();
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
        // Calculate foods count
        if (params['count'] === undefined) {
            params['count'] = this.field.getWidth() * this.field.getHeight() * params['density'];
        }
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

        if (count > this.fieldSquare) {
            return;
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
            this.fieldSquare--;
        }
    }

    moveBacteria(bacteria: IBacteria): void {
        if (!bacteria.canLive()) {
            this.field.removeItem(bacteria);
            this.fieldSquare++;
            return;
        }
        if (!bacteria.canMove()) {
            return;
        }

        // Remember bacteria old coordinates
        let oldCoordinates = bacteria.getCoordinates();

        // Move bactria
        bacteria.move();

        // Check if there is something edible in the bacteria's place after step. And make bacteria to eat it
        this.feedBacteria(bacteria);

        // If bacteria moved - remove it from the old place and add to the new one
        if (oldCoordinates !== bacteria.getCoordinates()) {
            this.field.moveItem(oldCoordinates, bacteria.getCoordinates());
        }
    }

    feedBacteria(bacteria: IBacteria): void {
        let item = this.field.getItem(bacteria.getCoordinates());
        if (item !== null && bacteria.canEat(item)) {
            bacteria.eat(item);
            this.field.removeItem(item);
            this.fieldSquare++;
        }
    }

    reproduceBacteria(bacteria: IBacteria): void {
        if (!bacteria.canReproduce()) {
            return;
        }
        let newBacteria = bacteria.reproduce();
        if (newBacteria !== null) {
            // Check if there is something edible in the new bacteria's current place. And make bacteria to eat it
            this.feedBacteria(bacteria);
            this.field.addItem(newBacteria);
            this.fieldSquare--;
        }
    }
}