import { NgForm } from '@angular/forms/src/directives';
import { RestaurantService } from '../restaurant.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../../../models/restaurant.model';
import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../../modules/material.io.module';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  @Input() public restaurant: Restaurant;
  public show = false;
  newReactie: string;
  score: number;

  constructor(
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  addReactie(form: NgForm) {
    if (form.valid) {
      this.restaurantService.addReactie(this.restaurant._id, this.newReactie, this.score).subscribe(data => {
        console.log(data);
        let reactie = data;
        this.restaurant.reacties.push(reactie);
        this.flashMessage.show('Reactie werd toegevoegd', {
          cssClass: 'alert-success',
          timeout: 5000
        });
        form.resetForm();
      });
    }
  }

  toggle() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }



}
