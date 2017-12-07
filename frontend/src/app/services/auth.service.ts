import { isDate } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  //private _url = 'http://localhost:3000/users';
  private _url =  'https://salty-tor-21384.herokuapp.com/users';
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user$ = new BehaviorSubject<string>(currentUser && currentUser.username);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    const localCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    return !!localCurrentUser ? localCurrentUser.token : '';
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login`, { username: username, password: password })
      .map(res => res.json()).map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  getProfile() {
    let headers = new Headers();
    const token = localStorage.getItem('id_toke');
    headers.append('Authorization', token);
    headers.append('Content-Type','application/json');
    return this.http.get(`${this._url}/profile`,{headers: headers})
      .map(res => res.json());
  }

  loggedIn() {
    if (this._user$.getValue()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      setTimeout(() => this._user$.next(null));
    }
  }

  register(username: string, password: string, name: string, email: string): Observable<boolean> {
    return this.http.post(`${this._url}/register`, { username: username, password: password, name: name, email: email })
      .map(res => res.json()).map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: res.token }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkusername`, { username: username }).map(res => res.json())
      .map(item => {
        if (item.username === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      });
  }
}