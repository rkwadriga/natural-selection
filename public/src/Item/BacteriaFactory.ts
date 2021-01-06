import {IField} from "../Field/IField";

export class BacteriaFactory
{
    protected readonly field: IField;

    constructor(field: IField) {
        this.field = field;
    }
}