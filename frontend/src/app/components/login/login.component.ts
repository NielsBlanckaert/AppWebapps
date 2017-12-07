import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';


function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    console.log(control.value);
    return control.value.length < 12 ? { 'passwordTooShort': { value: control.value.length } } : null;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage:FlashMessagesService,) { }

  ngOnInit() {
  }

  onSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.login(user.username, user.password).subscribe(val => {
      if (val) {
        console.log(val);
        if (this.authService.redirectUrl) {
          this.router.navigateByUrl(this.authService.redirectUrl);
          this.flashMessage.show('Login failed', {
            cssClass: 'alert-danger',
            timeout: 5000});
          this.authService.redirectUrl = undefined;
        } else {
          this.flashMessage.show('You are now logged in', {
            cssClass: 'alert-success',
            timeout: 5000});
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }
}
