import { Reactie } from './reactie.model';

export class Restaurant {

    public _id: string;
    private _name: string;
    private _locatie: string;
    private _totaleScore: number;
    private _aantalBeoordelingen: number;
    private _reacties: Reactie[];

    static fromJSON(json): Restaurant {
        const res = new Restaurant(json.name, json.locatie, json.reacties);
        return res;
    }

    constructor(name?: string, locatie?: string, totaleScore?: number, aantalBeoordelingen?: number, reacties?: Reactie[]) {
        this._name = name;
        this._locatie = locatie;
        this._totaleScore = totaleScore;
        this._aantalBeoordelingen = aantalBeoordelingen;
        this._reacties = reacties || new Array<Reactie>();
    }

    get name(): string {
        return this._name;
    }
    

    get locatie(): string {
        return this._locatie;
    }

    get reacties(): Reactie[] {
        return this._reacties;
    }

    get totaleScore(): number {
        return this._totaleScore;
    }

    get aantalBeoordelingen(): number {
        return this._aantalBeoordelingen;
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            locatie: this._locatie,
            reacties: this._reacties,
        };
    }

}