import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { LoginRequest } from './loginRequest';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedInStatus: BehaviorSubject<Number> = new BehaviorSubject<Number>(
    Number(localStorage.getItem('loggedIn')) || -1
  );

  private apiURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  setLoggedIn(userID: Number) {
    localStorage.setItem('loggedIn', `${userID}`);
    this.loggedInStatus.next(Number(localStorage.getItem('loggedIn')));
  }

  getisLoggedIn() {
    return this.loggedInStatus.asObservable();
  }

  getUserDetail(credenciales: LoginRequest) {
    return this.http.get<Usuario[]>(
      `${this.apiURL}?email=${credenciales.email}&passWord=${credenciales.passWord}&baja=0`
    );
  }

  logOut() {
    localStorage.removeItem('loggedIn');
    this.loggedInStatus.next(-1);
    this.router.navigateByUrl('/inicio');
  }
}
