import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reactie } from '../../models/reactie.model';
import { Restaurant } from '../../models/restaurant.model';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RestaurantService {

  private _appUrl = 'http://localhost:3000';
  private _restaurants;

  constructor(private http: HttpClient, private auth: AuthService) { }

  get restaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this._appUrl}/restaurants`,
     { headers: new HttpHeaders({Authorization: `Bearer ${this.auth.token}`}) });
  }

  getRestaurant(id): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this._appUrl}/restaurant/${id}`);
  }

  addNewRestaurant(restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this._appUrl}/restaurants`, restaurant,
     { headers: new HttpHeaders({Authorization: `Bearer ${this.auth.token}`}) })

  }

  addReactie(restaurantId, tekst, score): Observable<Reactie> {
    return this.http.post<Reactie>(`${this._appUrl}/restaurants/${restaurantId}/reacties`, {tekst : tekst, score: score},
     { headers: new HttpHeaders({Authorization: `Bearer ${this.auth.token}`}) })
  }

}
