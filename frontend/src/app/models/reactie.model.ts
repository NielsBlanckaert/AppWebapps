import { Restaurant } from './restaurant.model';
import { User } from './user.model';
export class Reactie {

    private _id: string;
    private _user: User;
    private _tekst: string;
    private _datum: Date;
    private _restaurant: Restaurant;
    public _score: number;
    
    static fromJSON(json): Reactie {
        const reactie = new Reactie();
        return reactie;
    }

    constructor(restaurant?: Restaurant, tekst?: string, score?: number, user?: User, datum?: Date) {
        this._user = user;
        this._tekst = tekst;
        this._datum = datum;
        this._restaurant = restaurant;
        this._score = score;
    }
    
    get id(): string{
        return this._id;
    }

    get user(): User {
        return this._user;
    }

    get date(): Date {
        return this._datum;
    }

    get tekst(): string {
        return this._tekst;
    }

    get restaurant(): Restaurant {
        return this._restaurant;
    }

}