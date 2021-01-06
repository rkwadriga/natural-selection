import {FoodFactory} from "../Item/FoodFactory";
import {EdibleBacteriaFactory} from "../Item/EdibleBacteriaFactory";
import {PredatoryBacteriaFactory} from "../Item/PredatoryBacteriaFactory";
import {IDrawableItemFactory} from "../Item/IDrawableItemFactory";
import {ItemType} from "../Types/ItemType";
import {IField} from "../Field/IField";
import {IDrawableItem} from "../Item/IDrawableItem";
import {IBacteria} from "../Item/IBacteria";

export class ItemService
{
    private readonly field: IField;
    private readonly foodFactory: FoodFactory;
    private readonly edibleBacteriaFactory: EdibleBacteriaFactory;
    private readonly predatoryBacteriaFactory: PredatoryBacteriaFactory;

    constructor(field: IField)
    {
        this.field = field;
        this.foodFactory = new FoodFactory(field);
        this.edibleBacteriaFactory = new EdibleBacteriaFactory(field);
        this.predatoryBacteriaFactory = new PredatoryBacteriaFactory(field);
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

    generateItemsAndAddThemToField(type: ItemType, count: number): void
    {
        for (let i = 0; i < count; i++) {
            let item: IDrawableItem;
            let hasItem = true;
            while (hasItem) {
                item = this.getFactory(type).createDrawableItem(this.field.getWidth(), this.field.getHeight());
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
        bactria.move();
    }

    feedBacteria(bacteria: IBacteria): void
    {
        if (!bacteria.canEat()) {
            return;
        }
        let food = this.field.getItem(bacteria.getCoordinates());
        if (food !== null) {
            if (bacteria.eat(food)) {
                this.field.removeItem(food);
            }
        }
    }
}