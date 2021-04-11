export enum ItemType {
    FOOD = 'Food',
    EDIBLE_BACTERIA = 'Edible Bacteria',
    PREDATORY_BACTERIA = 'Predatory Bacteria',
    OMNIVOROUS_BACTERIA = 'Omnivorous Bacteria'
}

export type Food = {
    type: ItemType;
    density: number;
    reproductionSpeed: number;
};

export type Bacteria = {
    type: ItemType;
    count: number;
};

export type Ecosystem = {
    name: string;
    width: number;
    height: number;
    speed: number;
    duration: number;
    foods: Food[];
    bacterias: Bacteria[];
}

export class DefaultConfig
{
    name: string = 'Ecosystem #1';
    width: number = 50;
    height: number = 25;
    duration: number = 0;
    speed: number = 1;
    foods: Food[] = [
        {
            type: ItemType.FOOD,
            density: 0.2,
            reproductionSpeed: 3
        }
    ];
    bacterias: Bacteria[] = [
        {
            type: ItemType.EDIBLE_BACTERIA,
            count: 10
        }
    ];
}