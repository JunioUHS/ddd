export default class Address {
    private _street: string = "";
    private _number: number = 0;
    private _zip: string = "";
    private _city: string = "";

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();
    }

    private validate() {
        if (this._street.length === 0) {
            throw new Error("Address street is required");
        }
        if (this._number === 0) {
            throw new Error("Address number is required");
        }
        if (this._zip.length === 0) {
            throw new Error("Address zip is required");
        }
        if (this._city.length === 0) {
            throw new Error("Address city is required");
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
    }
}