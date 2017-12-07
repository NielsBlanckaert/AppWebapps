import {Restaurant} from '../models/restaurant.model';

export class User {
    private _username: string;
    private _email: string;
    private _favorieten: Restaurant[];
    private _beoordeeldeRestaurants: Restaurant[];

    get username(): string {
        return this._username;
    }

    get email(): string{
        return this._email;
    }

    get favorieten(): Restaurant[] {
        return this._favorieten;
    }

    get beoordeeldeRestaurants(): Restaurant[]{
        return this._beoordeeldeRestaurants;
    }

}