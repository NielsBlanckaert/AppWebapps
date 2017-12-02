export class Restaurant {
    private _id: string;
    private _name: string;
    private _locatie: string;
    private _beoordeling = new Array<string>();

    constructor(name: string) {
      this._name = name;
    }
    get name() : string {
      return this._name;
    }

    get locatie(): string {
        return this._locatie;
    }

    addBeoordeling(beoordeling?: number) {
      this._beoordeling.push(`${beoordeling || 1}`);
    }
}