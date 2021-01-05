import {FoodFactory} from "../Item/FoodFactory";
import {EdibleBacteriaFactory} from "../Item/EdibleBacteriaFactory";
import {PredatoryBacteriaFactory} from "../Item/PredatoryBacteriaFactory";
import {IDrawableItemFactory} from "../Item/IDrawableItemFactory";
import {ItemType} from "../Item/ItemType";
import {IField} from "../Field/IField";
import {IDrawableItem} from "../Item/IDrawableItem";

export class ItemService
{
    private readonly foodFactory: FoodFactory;
    private readonly edibleBacteriaFactory: EdibleBacteriaFactory;
    private readonly predatoryBacteriaFactory: PredatoryBacteriaFactory;

    constructor()
    {
        this.foodFactory = new FoodFactory();
        this.edibleBacteriaFactory = new EdibleBacteriaFactory();
        this.predatoryBacteriaFactory = new PredatoryBacteriaFactory();
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

    generateItemsAndAddThemToField(field: IField, type: ItemType, count: number): void
    {
        for (let i = 0; i < count; i++) {
            let item: IDrawableItem;
            let hasItem = true;
            while (hasItem) {
                item = this.getFactory(type).createDrawableItem(field.getWidth(), field.getHeight());
                hasItem = field.getItem(item.getCoordinates()) !== null;
            }
            field.addItem(item);
        }
    }
}