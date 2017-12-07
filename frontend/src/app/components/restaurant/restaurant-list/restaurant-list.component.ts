import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RestaurantService } from '../restaurant.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Restaurant } from '../../../models/restaurant.model';
import { MaterialModule } from '../../../modules/material.io.module';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
  providers: [RestaurantService]
})

export class RestaurantListComponent implements OnInit {
  private _restaurants: Restaurant[];
  public _restaurant: FormGroup;

  constructor(
    private http: Http,
    private _restaurantService: RestaurantService,
    private authenticationService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this._restaurantService.restaurants.subscribe(items => {
      this._restaurants = items;
      console.log(this._restaurants);
    });
    this._restaurant = new FormGroup({
      name: new FormControl('Naam', [Validators.required]),
      locatie: new FormControl('Locatie', [Validators.required])
    })
  }

  get restaurants() {
    return this._restaurants;
  }

  get restaurant() {
    return this._restaurant;
  }

  onSubmit() {
    const restaurant = new Restaurant(this._restaurant.value.name, this._restaurant.value.locatie);
    this._restaurantService.addNewRestaurant(restaurant).subscribe(data => {
      console.log(data);
      this._restaurants.push(data);
    });
  }

}
